<script lang="ts">
	import type { CellProps } from './props.ts';
	import { fromSpan } from './util.ts';

	const { index, children, cardProps }: CellProps = $props();
</script>

<span
	data-table-cell={index}
	style:--Cell-columns={fromSpan(cardProps?.columns)}
	style:--Cell-rows={fromSpan(cardProps?.rows)}
>
	{@render children()}
</span>

<style lang="scss">
	@use '@campground/ui' as *;

	span {
		display: flex;
		flex-direction: row;
		align-items: center;

		@include desktop-sm-up {
			&:first-of-type {
				padding-left: 2rem;
			}
			&:last-of-type {
				padding-right: 2rem;
			}
			padding: 0.5rem 0.25rem;
		}
		@include tablet-down {
			grid-column: var(--Cell-columns);
			grid-row: var(--Cell-rows);
		}
	}
</style>
