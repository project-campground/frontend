<script lang="ts">
	import type { CellProps } from './props.ts';

	const { children, ...attrs }: CellProps = $props();
</script>

<span
	data-grid-table-cell={true}
	{...attrs}
>
	{@render children()}
</span>
