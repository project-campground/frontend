<script lang="ts">
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { getMenuPortal, Menu, MenuPortalInstance, rightClickMenu } from '@campground/ui';
	import { ContentDisplay, MessageState } from '../index.ts';
	import Default from './Default.svelte';
	import System from './System.svelte';
	import Toolbar from './Toolbar.svelte';
	import { IconPencilFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import type { Snippet } from 'svelte';
	import { getTextTent } from './context.svelte.ts';
	import MessageEditor from '$lib/components/editor/MessageEditor.svelte';
	import { getAppview } from '$lib/context/api.js';
	import { localeStrings } from '$lib/locale/index.js';

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

	const textTent = getTextTent();
	const beingEdited = $derived(textTent.editingMessage?.id === message.id);
</script>

{#snippet actionMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root
		{instance}
		virtual={instance.event}
	>
		<Menu.List>
			<Menu.Item>
				<Menu.Button onclick={() => textTent.setEditingMessage(message.id)}>
					<IconPencilFilled />
					<LocaleMessage {...localeStrings.content.edit} />
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button color="danger">
					<IconTrashFilled />
					<LocaleMessage {...localeStrings.content.delete} />
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
{/snippet}

{#snippet content()}
	{#if beingEdited}
		<MessageEditor
			onSubmit={updateMessage}
			onCancel={() => textTent.clearEditingMessage()}
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
	data-state={Object.entries(MessageState)
		.find((x) => x[1] === state)?.[0]
		.toLowerCase() ?? 'loaded'}
	{@attach rightClickMenu(menuPortal, actionMenu)}
>
	<div class="toolbar">
		<Toolbar
			onOverflow={(ev) =>
				menuPortal.add(actionMenu as Snippet<[MenuPortalInstance]>, ev.currentTarget)}
		/>
	</div>
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
		&[data-state='creating'],
		&[data-state='failed'] {
			.wrapper {
				opacity: 0.5;
			}
		}
		&:hover .toolbar {
			opacity: 1;
		}
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
		gap: 1rem;
	}
</style>
