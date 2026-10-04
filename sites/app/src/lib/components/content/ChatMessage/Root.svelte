<script lang="ts">
	import { getMenuPortal, Menu, MenuPortalInstance, rightClickMenu, Threaded } from '@campground/ui';
	import { ContentDisplay } from '../index.ts';
	import Default from './ChatMessageType/Default.svelte';
	import System from './ChatMessageType/System.svelte';
	import type { Snippet } from 'svelte';
	import { getTextTent } from './context.svelte.ts';
	import MessageEditor from '$lib/components/editor/MessageEditor/Root.svelte';
	import { getAppview } from '$lib/context/api.js';
	import ContextMenu from './ChatMessageMenu/RightClick.svelte';
	import Toolbar from './ChatMessageMenu/Toolbar.svelte';
	import Reply from './Reply.svelte';
	import Continued from './ChatMessageType/Continued.svelte';
	import { fade } from 'svelte/transition';
	import Container from './Container.svelte';
	import Wrapper from './Wrapper.svelte';
	import type { RootProps } from './props.ts';
	import { MessageState } from './types.ts';

	const menuPortal = getMenuPortal();

	const { message, state: loadState, error, continuousMessage }: RootProps = $props();

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
		virtual={instance.payload}
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

<Container
	data-message-id={message.id}
	data-tent-id={message.tentId}
	data-campsite-id={message.campsiteId}
	data-bonfire-id={message.bonfireId}
	state={loadState}
	{beingRepliedTo}
	{continuousMessage}
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
			<Wrapper state={loadState}>
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
			</Wrapper>
		{/snippet}
		{#each message.replyingTo as reply (reply.id)}
			<Threaded.Item>
				<Reply message={reply} />
			</Threaded.Item>
		{/each}
	</Threaded.Root>
</Container>

<style lang="scss">
	@use '@campground/ui' as *;

	.toolbar {
		position: absolute;
		top: -1rem;
		right: 1rem;
		z-index: 10;
		transition: opacity $transition-time-md;
	}
</style>
