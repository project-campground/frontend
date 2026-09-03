<script lang="ts">
	import { getMenuPortal, MenuPortalInstance, TextBlock, tooltip, Tooltip } from '@campground/ui';
	import { MessageState } from './types.ts';
	import { getLocale, LocaleMessage } from '@campground/locale';
	import { IconExclamationCircleFilled, IconPencilFilled } from '@tabler/icons-svelte';
	import { localeStrings } from '$lib/locale/index.js';

	const menuPortal = getMenuPortal();
	const locale = getLocale();
	const {
		updatedAt,
		state,
		error,
	}: { updatedAt?: string | null; state?: MessageState; error?: unknown } = $props();
</script>

{#if updatedAt}
	{#snippet editTooltip(instance: MenuPortalInstance)}
		<Tooltip {instance}>
			{new Date(updatedAt).toLocaleString(locale.id)}
		</Tooltip>
	{/snippet}
	<span class="hasTooltip">
		<TextBlock
			level="subtext"
			fontSize={0.9}
			{@attach tooltip(menuPortal, editTooltip)}
		>
			<IconPencilFilled />
			<LocaleMessage {...localeStrings.messages.edited} />
		</TextBlock>
	</span>
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

<style lang="scss">
	@use '@campground/ui' as *;

	.hasTooltip {
		cursor: help;
		line-height: 0;
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
