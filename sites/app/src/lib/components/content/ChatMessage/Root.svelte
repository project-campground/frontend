<script lang="ts">
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { getMenuPortal, Menu, MenuPortalInstance, rightClickMenu, Threaded } from '@campground/ui';
	import { ContentDisplay, MessageState } from '../index.ts';
	import Default from './Default.svelte';
	import System from './System.svelte';
	import type { Snippet } from 'svelte';
	import { getTextTent } from './context.svelte.ts';
	import MessageEditor from '$lib/components/editor/MessageEditor.svelte';
	import { getAppview } from '$lib/context/api.js';
	import ContextMenu from './ContextMenu.svelte';
	import Toolbar from './Toolbar.svelte';
	import Reply from './Reply.svelte';

	const menuPortal = getMenuPortal();

	const {
		message,
		state,
		error,
	}: { message: MessageViewWithReplies; state?: MessageState; error?: Error } = $props();

	const appview = getAppview();

	async function updateMessage(content: string) {
		textTent.clearEditingMessage();
		return appview.messages.update(message.tentId, message.id, { content });
	}
	function setEditingMessage() {
		return textTent.setEditingMessage(message.id);
	}
	function toggleReply() {
		return beingRepliedTo ? textTent.removeReplyingTo(message.id) : textTent.addReplyingTo(message);
	}

	const textTent = getTextTent();
	const beingEdited = $derived(textTent.editingMessage?.id === message.id);

	const beingRepliedTo = $derived(textTent.replyingTo.includes(message));
	const pseudoMessage = $derived(state === MessageState.Creating || state === MessageState.Failed);
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
			{cantToggleReply}
			{pseudoMessage}
			{beingRepliedTo}
			{toggleReply}
			{setEditingMessage}
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

<div
	class={['container']}
	data-message-id={message.id}
	data-tent-id={message.tentId}
	data-campsite-id={message.campsiteId}
	data-bonfire-id={message.bonfireId}
	data-load-state={Object.entries(MessageState)
		.find((x) => x[1] === state)?.[0]
		.toLowerCase() ?? 'loaded'}
	data-state={beingRepliedTo ? 'replying' : 'default'}
	{@attach rightClickMenu(menuPortal, actionMenu)}
>
	<div class="toolbar">
		<Toolbar
			onOverflow={(ev) =>
				menuPortal.add(actionMenu as Snippet<[MenuPortalInstance]>, ev.currentTarget)}
			{toggleReply}
			{cantToggleReply}
			{pseudoMessage}
			{beingRepliedTo}
			{setEditingMessage}
		/>
	</div>
	<Threaded.Root direction="to-top">
		{#snippet parent()}
			<div class="wrapper">
				{#if message.type === 'system'}
					<System createdAt={message.createdAt}>
						{@render content()}
					</System>
				{:else}
					<Default
						{state}
						{error}
						updatedAt={message.updatedAt}
						createdBy={message.createdBy}
						createdAt={message.createdAt}
					>
						{@render content()}
					</Default>
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
		&:hover .toolbar {
			opacity: 1;
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
		opacity: 0;
		z-index: 10;
		transition: opacity $transition-time-md;
	}
	.wrapper {
		display: flex;
		flex-direction: row;
		padding: 0.5rem 1.5rem;
		gap: 0.75rem;
	}
</style>
