<script lang="ts">
	import { setPickContext } from '$lib/form/Pick/context.svelte.js';
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

	const { tabs, children }: RootProps = $props();
	let list: HTMLDivElement | null = $state(null);

	setPickContext(tabContext);
</script>

<section
	class="container"
	style:--Pick-count={tabContext.itemCount}
	style:--Pick-activeIndex={tabContext.activeItemIndex}
>
	<TabList>
		{@render tabs()}
	</TabList>
	<div class="listContainer">
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
	</div>
</section>

<style lang="scss">
	@use '../../common.scss' as *;

	.container {
		width: 100%;
	}
	.listContainer {
		height: max-content;
		overflow: hidden;
	}
	.list {
		display: grid;
		scrollbar-color: transparent transparent;
		scrollbar-width: none;
		overflow-y: hidden;
		overflow-x: auto;

		transition: transform $transition-time-md;

		grid-template-columns: repeat(var(--Pick-count), 100%);

		width: 100%;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;
		scroll-behavior: smooth;
	}
</style>
