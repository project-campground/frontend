<script lang="ts">
	import { getPickContext } from '$lib/form/Pick/context.svelte.js';
	import type { AsyncTabProps } from './props.ts';

	const { children, skeleton, alwaysRenderOnceSeen }: AsyncTabProps = $props();

	let tab: HTMLDivElement | null = $state(null);
	let toRender = $state(false);

	const tabContext = getPickContext();

	// Renders the element once
	$effect(() => {
		// ||= could be used, but that would just make it re-render every-time, since state is reassigned
		const currentlyActive =
			[...(tab?.parentElement?.children ?? [])].indexOf(tab!) === tabContext.activeItemIndex;

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
	div {
		width: 100%;
		height: 100%;
		overflow: auto;
		scroll-snap-align: start;
		flex-basis: 100%;
	}
</style>
