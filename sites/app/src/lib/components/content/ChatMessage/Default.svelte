<script lang="ts">
	import { UserAvatar } from '$lib/components/users/index.js';
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import {
		GradientText,
		TextBlock,
		Tooltip,
		tooltip,
		MenuPortalInstance,
		getMenuPortal,
	} from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { Datestamp } from '../Datestamp/index.ts';
	import { MessageState } from './types.js';
	import { IconExclamationCircleFilled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal, getLocaleContext } from '@campground/locale';

	const menuPortal = getMenuPortal();
	const intl = getLocaleContext();

	const {
		createdBy,
		createdAt,
		updatedAt,
		state,
		error,
		children,
	}: {
		createdBy: MessageViewWithReplies['createdBy'];
		updatedAt?: string;
		createdAt: string;
		state?: MessageState;
		error?: Error;
		children: Snippet;
	} = $props();
</script>

<UserAvatar
	did={createdBy.user.did}
	src={createdBy.user.avatar ?? undefined}
/>
<div class="wrapper">
	<div class="header">
		<TextBlock weight={700}>
			<GradientText colors={['var(--foreground-heading)']}>
				{createdBy.nickname ?? createdBy.user.displayName ?? createdBy.user.handle}
			</GradientText>
		</TextBlock>
		<TextBlock
			level="subtext"
			fontSize={0.9}
		>
			<Datestamp
				when
				date={createdAt}
			/>
		</TextBlock>
		{#if updatedAt}
			{#snippet editTooltip(instance: MenuPortalInstance)}
				<Tooltip {instance}>
					{new Date(updatedAt).toLocaleString($intl.locale)}
				</Tooltip>
			{/snippet}
			<TextBlock
				level="subtext"
				fontSize={0.9}
				{@attach tooltip(menuPortal, editTooltip)}
			>
				(<FormattedMessageGlobal id="app.common.edited" />)
			</TextBlock>
		{/if}
		{#if state === MessageState.Failed}
			{#snippet stateTooltip(instance: MenuPortalInstance)}
				<Tooltip {instance}>
					{error}
				</Tooltip>
			{/snippet}
			<span
				class="info"
				{@attach tooltip(menuPortal, stateTooltip)}
			>
				<IconExclamationCircleFilled size="1rem" />
			</span>
		{/if}
	</div>
	<div class="content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
	}
	.info {
		cursor: help;
		line-height: 0;
		color: var(--foreground-body);

		:global([data-state='failed']) & {
			color: var(--danger-plainFore);
		}
	}
</style>
