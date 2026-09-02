<script lang="ts">
	import { Stack, Threaded } from '@campground/ui';
	import TentWrapper from '../../TentWrapper.svelte';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { IconHash } from '@tabler/icons-svelte';
	import MessageEditor from '$lib/components/editor/MessageEditor.svelte';
	import { getAppview } from '$lib/context/api.js';
	import { getCampsiteContext } from '../../../context.svelte.ts';
	import { filter } from 'rxjs';
	import type { WSMessageTypeToPayload } from '$lib/api/ws/types.js';
	import {
		MessageState,
		type MessageViewInChat,
	} from '$lib/components/content/ChatMessage/types.js';
	import { v4 as uuid } from 'uuid';
	import {
		setTextTent,
		TextTentContext,
	} from '$lib/components/content/ChatMessage/context.svelte.js';
	import TentMessageList from './TentMessageList.svelte';

	const { tent }: { tent: TentViewBasic } = $props();

	const campsiteContext = getCampsiteContext();
	const webSocket = $derived(campsiteContext.webSocket);
	const campsiteRef = $derived(campsiteContext.campsite);
	const appview = getAppview();

	async function createMessage(content: string) {
		const createdMessageKey = uuid();

		textTent.messages.unshift({
			key: createdMessageKey,
			id: createdMessageKey,
			campsiteId: tent.campsiteId,
			bonfireId: tent.bonfireId,
			tentId: tent.id,
			state: MessageState.Creating,
			content,
			replyingTo: textTent.replyingTo.map((message) => ({
				...message,
				replyingTo: message.replyingTo.map((sub) => sub.id),
			})),
			replyingToCount: textTent.replyingTo.length,
			createdBy: { ...$campsiteRef!.campsite.me, isMember: true },
			createdAt: new Date().toISOString(),
		});

		const replies = textTent.replyingTo.map((message) => message.id);
		textTent.clearReplies();

		return appview.messages.create(tent.id, { content, replies }).catch((err) => {
			// Since modifying object directly doesn't change it
			const existingMessage = textTent.messages.find((x) => x.key === createdMessageKey);

			if (!existingMessage) return;

			Object.assign(existingMessage, { state: MessageState.Failed, stateMessage: err });
		});
	}

	const eventHandlers: Partial<{
		[K in keyof WSMessageTypeToPayload]: (value: WSMessageTypeToPayload[K]) => unknown;
	}> = {
		MessageCreated(message) {
			if (message.tentId !== tent.id) return;

			const existingMessage = textTent.messages.find(
				(x) => x.content === message.content && x.state === MessageState.Creating,
			);

			if (existingMessage)
				return Object.assign(existingMessage, { id: message.id, state: MessageState.Created });

			return textTent.messages.unshift({
				...message,
				// Added
				key: message.id,
				state: MessageState.Loaded,

				// Overwritten
				replyingTo: [],
				replyingToCount: 0,
			} satisfies MessageViewInChat);
		},
		MessageUpdated(message) {
			if (message.tentId !== tent.id) return;

			const existingMessage = textTent.messages.find((x) => x.id === message.id);

			if (existingMessage) return Object.assign(existingMessage, message);
		},
		MessageDeleted(message) {
			if (message.tentId !== tent.id) return;
			// To disallow replying to removed messages
			else if (textTent.isReplyingTo(message.id)) textTent.removeReplyingTo(message.id);

			const existingMessage = textTent.messages.findIndex((x) => x.id === message.id);

			if (existingMessage >= 0) return textTent.messages.splice(existingMessage, 1);
		},
	};

	const textTent = new TextTentContext();

	$effect(() => {
		const subscription = $webSocket?.messages
			.pipe(filter((value) => value.op === 1))
			.subscribe((ev) => {
				const payload = ev.payload as WSMessageTypeToPayload[keyof WSMessageTypeToPayload];
				return eventHandlers[ev.t]?.(payload as never);
			});

		return () => subscription?.unsubscribe();
	});

	setTextTent(textTent);
</script>

<TentWrapper>
	{#snippet icon()}
		<IconHash />
	{/snippet}
	{#snippet title()}
		{tent?.name}
	{/snippet}
	<div class="content">
		<Stack
			direction="column-reverse"
			flex={1}
			gap={0}
		>
			<svelte:boundary>
				{#snippet pending()}
					Loading messages...
				{/snippet}
				{#snippet failed(err)}
					Err: {err}
				{/snippet}
				<TentMessageList {tent} />
			</svelte:boundary>
		</Stack>
	</div>
	<div class="input">
		<Threaded.Root
			direction="to-top"
			size="sm"
		>
			{#snippet parent()}
				<MessageEditor
					onSubmit={createMessage}
					tentName={tent.name}
				/>
			{/snippet}
			{#each textTent.replyingTo as reply (reply.id)}
				<Threaded.Item>
					{reply.id}
				</Threaded.Item>
			{/each}
		</Threaded.Root>
	</div>
</TentWrapper>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column-reverse;
		padding: 1.25rem 0;

		flex: 1;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.input {
		padding-inline: 1rem;
		padding-block-end: 1rem;
	}
</style>
