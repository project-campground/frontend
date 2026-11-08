<script lang="ts">
	import type { RowProps } from './props.ts';

	const { children, ...attrs }: RowProps = $props();
</script>

<div
	data-grid-table-row={true}
	{...attrs}
>
	{@render children()}
</div>

<style lang="scss">
	div {
		display: contents;
	}
</style>
