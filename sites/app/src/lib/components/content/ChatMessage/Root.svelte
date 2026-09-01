<script lang="ts">
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { getMenuPortal, Menu, MenuPortalInstance, rightClickMenu } from '@campground/ui';
	import { ContentDisplay, MessageState } from '../index.ts';
	import Default from './Default.svelte';
	import System from './System.svelte';
	import Toolbar from './Toolbar.svelte';
	import { IconPencilFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';
	import type { Snippet } from 'svelte';

	const menuPortal = getMenuPortal();

	const {
		message,
		state,
		error,
	}: { message: MessageViewWithReplies; state?: MessageState; error?: Error } = $props();
</script>

{#snippet actionMenu(instance: MenuPortalInstance<PointerEvent>)}
	<Menu.Root
		{instance}
		virtual={instance.event}
	>
		<Menu.List>
			<Menu.Item>
				<Menu.Button>
					<IconPencilFilled />
					<FormattedMessageGlobal id="common.edit" />
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button color="danger">
					<IconTrashFilled />
					<FormattedMessageGlobal id="common.delete" />
				</Menu.Button>
			</Menu.Item>
		</Menu.List>
	</Menu.Root>
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
				<ContentDisplay {...message} />
			</System>
		{:else}
			<Default
				{state}
				{error}
				createdBy={message.createdBy}
				createdAt={message.createdAt}
			>
				<ContentDisplay {...message} />
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
