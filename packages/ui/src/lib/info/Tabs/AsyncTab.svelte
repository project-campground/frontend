<script lang="ts">
	import { getTabsContext } from './context.svelte.ts';
	import type { AsyncTabProps } from './props.ts';

	const { children, skeleton, alwaysRenderOnceSeen }: AsyncTabProps = $props();

	let tab: HTMLDivElement | null = $state(null);
	let toRender = $state(false);

	const tabContext = getTabsContext();

	// Renders the element once
	$effect(() => {
		// ||= could be used, but that would just make it re-render every-time, since state is reassigned
		const currentlyActive =
			[...(tab?.parentElement?.children ?? [])].indexOf(tab!) === tabContext.activeTabIndex;

		if (!toRender && currentlyActive) toRender = true;
		else if (!alwaysRenderOnceSeen && !currentlyActive && toRender) toRender = false;
	});
</script>

<div
	role="tabpanel"
	bind:this={tab}
>
	<!-- Still render skeleton while loading -->
	{#if toRender}
		<svelte:boundary>
			{#snippet pending()}
				{@render skeleton()}
			{/snippet}
			{@render children?.()}
		</svelte:boundary>
	{:else}
		{@render skeleton()}
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		overflow: auto;
		scroll-snap-align: start;
		flex-basis: 100%;
	}
</style>
