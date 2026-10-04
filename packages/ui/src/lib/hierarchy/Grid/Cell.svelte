<script lang="ts">
	import type { CellProps } from './props.ts';

	const { children, start, end, ...attributes }: CellProps = $props();
</script>

<div
	role="gridcell"
	style:--GridCell-start={start}
	style:--GridCell-end={end}
	aria-colindex={start}
	aria-colspan={end && start ? end - start : null}
	{...attributes}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use 'sass:list';

	div {
		grid-column-start: var(--GridCell-start);
		grid-column-end: var(--GridCell-end);
	}
</style>
