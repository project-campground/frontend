<script lang="ts">
	import { setPickContext } from '$lib/form/Pick/context.svelte.js';
	import { notInherited } from '$lib/util/component.ts';
	import TabList from './List.svelte';
	import { TabsContext } from './context.svelte.ts';
	import type { RootProps } from './props.ts';

	const tabContext = new TabsContext();

	$effect(() => {
		list?.scrollTo(list?.clientWidth * tabContext.activeItemIndex, 0);
	});

	$effect(() => {
		if (tabContext.itemsForm) tabContext.items.item(0).checked = true;
	});

	const { tabs, children, flex, gridColumn, gridRow }: RootProps = $props();
	let list: HTMLDivElement | null = $state(null);

	setPickContext(tabContext);
</script>

<section
	class="container"
	style:--Pick-count={tabContext.itemCount}
	style:--Pick-activeIndex={tabContext.activeItemIndex}
	style:--Layout-flex={notInherited(flex)}
	style:--Layout-gridColumn={notInherited(gridColumn)}
	style:--Layout-gridRow={notInherited(gridRow)}
>
	<TabList>
		{@render tabs()}
	</TabList>
	<div
		bind:this={list}
		class="list"
		onscrollend={(ev) =>
			(tabContext.activeItemIndex = Math.round(
				ev.currentTarget.scrollLeft / ev.currentTarget.clientWidth,
			))}
	>
		{@render children()}
	</div>
</section>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../../hierarchy/Layout.scss' as *;

	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		overflow: hidden;
		@extend %InLayout;
	}
	.list {
		display: grid;
		scrollbar-color: transparent transparent;
		scrollbar-width: none;
		overflow-y: hidden;
		overflow-x: auto;

		transition: transform $transition-time-md;

		grid-template-columns: repeat(var(--Pick-count), 100%);
		grid-template-rows: 1fr;

		flex: 1;
		width: 100%;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;
		scroll-behavior: smooth;
	}
</style>
