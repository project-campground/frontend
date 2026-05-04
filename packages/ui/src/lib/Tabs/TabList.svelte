<script lang="ts">
	import type { ListProps } from './props.ts';

	const { children }: ListProps = $props();
</script>

<div class="TabList container">
	<div class="TabList root">
		<div class="TabList highlight"></div>
		<div class="TabList list">
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../index.scss' as *;

	.TabList {
		&.container {
			width: 100%;
			padding: 4px 8px;
			border-radius: var(--radius-sm);
			background-color: var(--palette-background-body);
		}
		&.root {
			position: relative;
			overflow: hidden;
			width: 100%;
		}
		&.highlight {
			position: absolute;
			z-index: 1;
			background-color: var(--palette-background-level2);
			border-radius: var(--radius-sm);
			width: calc(100% / var(--Tabs-tabCount));
			top: 0;
			bottom: 0;
			left: calc((100% / var(--Tabs-tabCount)) * var(--Tabs-activeTabIndex));
			height: 100%;
			transition: left $transition-time-md;
		}
		&.list {
			position: relative;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: grid;
			z-index: 2;
			grid-template-columns: repeat(var(--Tabs-tabCount), 1fr);
		}
	}
</style>
