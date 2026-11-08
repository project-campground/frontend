<script lang="ts">
	import type { ItemProps } from './props.ts';

	const { children, ...attributes }: ItemProps = $props();
</script>

<div {...attributes}>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
		overflow: auto;
		scroll-snap-align: start;
	}
</style>
