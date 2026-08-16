<script lang="ts">
	import TabList from './List.svelte';
	import { setTabsContext, TabsContext } from './context.svelte.ts';
	import type { RootProps } from './props.ts';

	const tabContext = new TabsContext();

	$effect(() => list?.scrollTo(list?.clientWidth * tabContext.activeTabIndex, 0));

	const { tabs, children }: RootProps = $props();
	let list: HTMLDivElement | null = $state(null);

	setTabsContext(tabContext);
</script>

<section
	class="container"
	style:--Tabs-tabCount={tabContext.tabCount}
	style:--Tabs-activeTabIndex={tabContext.activeTabIndex}
>
	<TabList>
		{@render tabs()}
	</TabList>
	<div class="listContainer">
		<div
			bind:this={list}
			class="list"
			onscrollend={(ev) =>
				(tabContext.activeTabIndex = Math.round(
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

		grid-template-columns: repeat(var(--Tabs-tabCount), 100%);

		width: 100%;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;
		scroll-behavior: smooth;
	}
</style>
