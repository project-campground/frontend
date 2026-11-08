<script lang="ts">
	import type { RootProps } from './props.ts';

	const { children, columns, size, height, ...attrs }: RootProps = $props();
</script>

<div
	data-size={size ?? 'md'}
	data-height={height}
	style:--GridTable-columns={columns?.map((x) => (x ? `${x}fr` : 'auto')).join(' ')
		?? 'auto auto auto'}
	{...attrs}
>
	{@render children()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Table/Table.scss' as *;

	$cell-padding: create-size-map((0, 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem));

	div {
		display: grid;
		border-radius: var(--radius-md);
		color: var(--foreground-body);
		grid-template-columns: var(--GridTable-columns);
		overflow: hidden;
		box-sizing: border-box;

		&[data-height='full'] {
			overflow-y: scroll;
			height: 100%;
			:global([data-grid-table-header] > [data-grid-table-cell]) {
				position: sticky;
				top: 0;
			}
			:global([data-grid-table-footer] > [data-grid-table-cell]) {
				position: sticky;
				bottom: 0;
			}
		}

		:global([data-grid-table-header] > [data-grid-table-cell]) {
			font-weight: 700;
			color: var(--foreground-subheading);
		}
		:global([data-grid-table-footer] > [data-grid-table-cell]) {
			color: var(--foreground-subtext);
		}

		@each $size, $value in $cell-padding {
			&[data-size='#{$size}'] {
				border-radius: var(--radius-#{$size});
				:global([data-grid-table-cell]) {
					padding: $value calc($value * 1.5);
				}
				&[data-variant='solid'] {
					box-shadow: var(--shadow-#{$size});
				}
			}
		}

		@extend %Table-solid;
		:global([data-grid-table-header] > [data-grid-table-cell]),
		:global([data-grid-table-footer] > [data-grid-table-cell]) {
			@extend %Table-solidMeta;
		}
		:global([data-grid-table-row]:nth-of-type(even) [data-grid-table-cell]) {
			@extend %Table-solidEvenRow;
		}
	}
</style>
