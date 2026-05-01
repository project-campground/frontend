<script module lang="ts">
	export interface Props {
		tabIds: TabId[];
		tabs: Snippet<[TabId]>;
		children: Snippet;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import TabList from './TabList.svelte';
	import { setTabContext, type TabId } from './context.ts';

	function onTabSelect(id: TabId) {
		console.log('Tab selected', id);
		activeTab = id;
		list.scrollTo(list.clientWidth * tabIds.indexOf(id), 0);
	}

	const { tabIds, tabs, children }: Props = $props();
	let activeTab: TabId | null = $state(null);
	let list: HTMLDivElement;

	const activeTabIndex = $derived(activeTab === null ? 0 : tabIds.indexOf(activeTab!));

	setTabContext({
		onTabSelect
	});
</script>

<div
	class="Tabs container"
	style:--Tabs-tabCount={tabIds.length}
	style:--Tabs-activeTabIndex={activeTabIndex}
>
	<TabList>
		{@render tabs(activeTab ?? tabIds[0] ?? '')}
	</TabList>
	<div class="Tabs listContainer">
		<div
			bind:this={list}
			class="Tabs list"
			onscrollend={(ev) =>
				(activeTab = tabIds[Math.round(list.scrollLeft / list.clientWidth)] ?? null)}
		>
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.Tabs {
		&.container {
			width: 100%;
		}
		&.listContainer {
			height: max-content;
			overflow: hidden;
		}
		&.list {
			display: grid;
			grid-template-columns: repeat(var(--Tabs-tabCount), 100%);
			scrollbar-color: transparent transparent;
			scrollbar-width: none;
			overflow-y: hidden;
			overflow-x: auto;
			transition: transform $transition-time-md;
			// width: calc(100% * var(--Tabs-tabCount));
			width: 100%;
			scroll-snap-type: x mandatory;
			scroll-snap-stop: always;
			scroll-behavior: smooth;
			// transform: translateX(calc((-100% / var(--Tabs-tabCount)) * var(--Tabs-activeTabIndex)));
		}
	}
</style>
