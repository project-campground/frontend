<script lang="ts">
	import type { TabProps } from './props.ts';

	const { children }: TabProps = $props();
</script>

<div
	role="tabpanel"
	class="Tabs Tab"
>
	{@render children?.()}
</div>

<style lang="scss">
	.Tab {
		width: 100%;
		height: 100%;
		overflow: auto;
		scroll-snap-align: start;
		flex-basis: 100%;
	}
</style>
