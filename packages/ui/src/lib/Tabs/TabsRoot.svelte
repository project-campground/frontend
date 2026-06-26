<script lang="ts">
	import TabList from './TabList.svelte';
	import { setTabContext, type TabId } from './context.ts';
	import type { RootProps } from './props.ts';

	function onTabSelect(id: TabId) {
		console.log('Tab selected', id);
		activeTab = id;
		list.scrollTo(list.clientWidth * tabIds.indexOf(id), 0);
	}

	const { tabIds, tabs, children }: RootProps = $props();
	let activeTab: TabId | null = $state(null);
	let list: HTMLDivElement;

	const activeTabIndex = $derived(activeTab === null ? 0 : tabIds.indexOf(activeTab!));

	setTabContext({ onTabSelect });
</script>

<section
	class="Tab TabsRoot container"
	style:--Tabs-tabCount={tabIds.length}
	style:--Tabs-activeTabIndex={activeTabIndex}
>
	<TabList>
		{@render tabs(activeTab ?? tabIds[0] ?? '')}
	</TabList>
	<div class="Tabs TabsRoot listContainer">
		<div
			bind:this={list}
			class="Tabs TabsRoot list"
			onscrollend={(ev) =>
				(activeTab = tabIds[Math.round(list.scrollLeft / list.clientWidth)] ?? null)}
		>
			{@render children()}
		</div>
	</div>
</section>

<style lang="scss">
	@use '../index.scss' as *;

	.TabsRoot {
		&.container {
			width: 100%;
		}
		&.listContainer {
			height: max-content;
			overflow: hidden;
		}
		&.list {
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
	}
</style>
