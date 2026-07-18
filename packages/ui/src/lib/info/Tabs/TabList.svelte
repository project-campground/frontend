<script lang="ts">
	import { getTabsContext } from './context.svelte.ts';
	import type { ListProps } from './props.ts';

	const { children }: ListProps = $props();

	const tabContext = getTabsContext();

	// Make the first one automatically checked
	$effect(() => {
		if (tabContext.tabItemsForm)
			(tabContext.tabItemsForm.items as RadioNodeList).item(0).checked = true;
	});
</script>

<div
	class="container"
	role="tablist"
>
	<form
		class="root"
		bind:this={tabContext.tabItemsForm}
	>
		<div class="highlight"></div>
		<div class="list">
			{@render children()}
		</div>
	</form>
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	.container {
		width: 100%;
		padding: 4px 8px;
		border-radius: var(--radius-sm);
		background-color: var(--background-body);
		transition: background $transition-time-lg;
	}
	.root {
		position: relative;
		width: 100%;
	}
	.highlight {
		position: absolute;
		z-index: 1;

		background-color: var(--background-content);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);

		width: calc(100% / var(--Tabs-tabCount));
		top: 0;
		bottom: 0;
		left: calc((100% / var(--Tabs-tabCount)) * var(--Tabs-activeTabIndex));
		height: 100%;
		transition: left, background;
		transition-duration: $transition-time-lg;
	}
	.list {
		position: relative;
		display: flex;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
	}
</style>
