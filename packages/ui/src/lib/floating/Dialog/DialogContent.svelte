<script lang="ts">
	import type { ContentProps } from './props.ts';

	const { children, size, level, ...attributes }: ContentProps = $props();
</script>

<div>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		flex: 1;
	}
</style>
