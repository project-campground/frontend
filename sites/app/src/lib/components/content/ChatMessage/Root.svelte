<script lang="ts">
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { getMenuPortal, Menu, MenuPortalInstance, rightClickMenu, Threaded } from '@campground/ui';
	import { ContentDisplay, MessageState } from '../index.ts';
	import Default from './Default.svelte';
	import System from './System.svelte';
	import type { Snippet } from 'svelte';
	import { getTextTent } from './context.svelte.ts';
	import MessageEditor from '$lib/components/editor/MessageEditor/Root.svelte';
	import { getAppview } from '$lib/context/api.js';
	import ContextMenu from './ContextMenu.svelte';
	import Toolbar from './Toolbar.svelte';
	import Reply from './Reply.svelte';
	import Continued from './Continued.svelte';
	import { fade } from 'svelte/transition';

	const menuPortal = getMenuPortal();

	const {
		message,
		state: loadState,
		error,
		continuousMessage,
	}: {
		message: MessageViewWithReplies;
		state?: MessageState;
		error?: Error;
		continuousMessage?: boolean;
	} = $props();

	const appview = getAppview();

	async function updateMessage(content: string) {
		textTent.clearEditingMessage();
		return appview.messages.update(message.tentId, message.id, { content });
	}
	async function deleteMessage() {
		return textTent.deleteMessage(message.tentId, message.id);
	}
	function setEditingMessage() {
		return textTent.setEditingMessage(message.id);
	}
	function toggleReply() {
		return beingRepliedTo ? textTent.removeReplyingTo(message.id) : textTent.addReplyingTo(message);
	}
	function openOverflowMenu(ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		contextMenuInstanceFromOverflow = menuPortal.add(
			actionMenu as Snippet<[MenuPortalInstance]>,
			ev.currentTarget,
		);
	}

	let contextMenuInstanceFromOverflow: MenuPortalInstance | null = $state(null);

	$effect(() => {
		if (
			contextMenuInstanceFromOverflow
			&& !menuPortal.items.includes(contextMenuInstanceFromOverflow)
		)
			contextMenuInstanceFromOverflow = null;
	});

	let hover: boolean = $state(false);

	const textTent = getTextTent();
	const beingEdited = $derived(textTent.editingMessage?.id === message.id);

	const beingRepliedTo = $derived(textTent.replyingTo.includes(message));
	const pseudoMessage = $derived(
		loadState === MessageState.Creating || loadState === MessageState.Failed,
	);
	const cantToggleReply = $derived(
		pseudoMessage || (textTent.replyingTo.length >= 5 && !beingRepliedTo),
	);
</script>

{#snippet actionMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root
		{instance}
		virtual={instance.event}
	>
		<ContextMenu
			messageType={message.type}
			{cantToggleReply}
			{pseudoMessage}
			{beingRepliedTo}
			{toggleReply}
			{setEditingMessage}
			{deleteMessage}
		/>
	</Menu.Root>
{/snippet}

{#snippet content()}
	{#if beingEdited}
		<MessageEditor
			onSubmit={updateMessage}
			onCancel={() => textTent.clearEditingMessage()}
			defaultValue={message.content}
		/>
	{:else}
		<ContentDisplay {...message} />
	{/if}
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={['container']}
	data-message-id={message.id}
	data-tent-id={message.tentId}
	data-campsite-id={message.campsiteId}
	data-bonfire-id={message.bonfireId}
	data-load-state={Object.entries(MessageState)
		.find((x) => x[1] === loadState)?.[0]
		.toLowerCase() ?? 'loaded'}
	data-state={beingRepliedTo ? 'replying' : 'default'}
	// Events
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
	{@attach rightClickMenu(menuPortal, actionMenu)}
>
	{#if hover || contextMenuInstanceFromOverflow}
		<div
			class="toolbar"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 300 }}
		>
			<Toolbar
				messageType={message.type}
				onOverflow={openOverflowMenu}
				{toggleReply}
				{cantToggleReply}
				{pseudoMessage}
				{beingRepliedTo}
				{setEditingMessage}
				{deleteMessage}
			/>
		</div>
	{/if}
	<Threaded.Root direction="to-top">
		{#snippet parent()}
			<div class="wrapper">
				{#if message.type === 'system'}
					<System createdAt={message.createdAt}>
						{@render content()}
					</System>
				{:else if !continuousMessage}
					<Default
						state={loadState}
						{error}
						updatedAt={message.updatedAt}
						createdBy={message.createdBy}
						createdAt={message.createdAt}
					>
						{@render content()}
					</Default>
				{:else}
					<Continued
						state={loadState}
						{error}
						updatedAt={message.updatedAt}
						createdAt={message.createdAt}
					>
						{@render content()}
					</Continued>
				{/if}
			</div>
		{/snippet}
		{#each message.replyingTo as reply (reply.id)}
			<Threaded.Item>
				<Reply message={reply} />
			</Threaded.Item>
		{/each}
	</Threaded.Root>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		position: relative;

		display: flex;
		flex-direction: column;

		transition: background $transition-time-md;
		&:hover {
			background-color: var(--background-content);
		}
		&[data-load-state='creating'],
		&[data-load-state='failed'] {
			.wrapper {
				opacity: 0.5;
			}
		}
		&[data-state='replying'] {
			background-color: var(--primary-softBack);
			&:hover {
				background-color: var(--primary-softBackHover);
			}
			&::before {
				background: linear-gradient(to bottom, var(--primary-glowFirst), var(--primary-glowSecond));
			}
		}
		&::before {
			position: absolute;
			content: '';
			top: 0.5rem;
			left: 0.5rem;
			bottom: 0.5rem;

			width: 0.25rem;
			border-radius: var(--radius-sm);
		}
		border-radius: var(--radius-md);
	}
	.toolbar {
		position: absolute;
		top: -1rem;
		right: 1rem;
		z-index: 10;
		transition: opacity $transition-time-md;
	}
	.wrapper {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0.5rem;
		padding: 0.25rem 1.5rem;
	}
</style>
