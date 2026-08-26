<script lang="ts">
	import type { CellProps } from './props.ts';

	const { children, start, end, ...attributes }: CellProps = $props();
</script>

<div
	role="gridcell"
	data-start={start}
	data-end={end}
	aria-colindex={start}
	aria-colspan={end && start ? end - start : null}
	{...attributes}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use 'sass:list';
	@use './Grid.scss' as *;

	div {
		@for $i from $min-columns through $max-columns {
			&[data-start='#{i}'] {
				grid-column-start: #{$i};
			}
			&[data-end='#{i}'] {
				grid-column-end: #{$i};
			}
		}
	}
</style>
