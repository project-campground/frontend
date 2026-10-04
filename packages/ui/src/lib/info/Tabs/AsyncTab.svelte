<script lang="ts">
	import { getPickContext } from '$lib/form/Pick/context.svelte.js';
	import type { AsyncTabProps } from './props.ts';
	import Tab from './Tab.svelte';

	const { children, skeleton, alwaysRenderOnceSeen, ...props }: AsyncTabProps = $props();

	let tab: HTMLDivElement | undefined = $state(undefined);
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

<Tab
	bind:element={tab}
	{...props}
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
</Tab>
