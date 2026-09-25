<script lang="ts">
	import type { RootProps } from './props.ts';

	const { children, size, height, ...attrs }: RootProps = $props();
</script>

<table
	data-size={size ?? 'md'}
	data-height={height}
	{...attrs}
>
	{@render children()}
</table>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './Table.scss' as *;

	$cell-padding: create-size-map((0, 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem));

	table {
		overflow: hidden;
		border-spacing: 0;

		&[data-height='full'] {
			height: 100%;
			:global(thead th) {
				position: sticky;
				top: 0;
			}
			:global(tfooter td) {
				position: sticky;
				bottom: 0;
			}
		}

		:global(thead),
		:global(th) {
			text-align: start;
			color: var(--foreground-subheading);
		}
		:global(tfoot) {
			color: var(--foreground-subtext);
		}

		@each $size, $value in $cell-padding {
			&[data-size='#{$size}'] {
				&:not([data-height='full']) {
					border-radius: var(--radius-#{$size});
				}
				:global(td),
				:global(th) {
					padding: $value calc($value * 1.5);
				}
				&[data-variant='solid'] {
					box-shadow: var(--shadow-#{$size});
				}
			}
		}

		&:not([data-height='full']) {
			@extend %Table-solid;
		}
		&[data-height='full'] {
			:global(thead th),
			:global(tbody:first-child tr:first-of-type td) {
				border-top: solid thin var(--neutral-border);
			}
			:global(tfoot td),
			:global(tbody:last-child tr:last-of-type td) {
				border-bottom: solid thin var(--neutral-border);
			}
			:global(th:first-of-type),
			:global(td:first-of-type) {
				border-left: solid thin var(--neutral-border);
			}
			:global(th:last-of-type),
			:global(td:last-of-type) {
				border-right: solid thin var(--neutral-border);
			}
		}

		:global(thead th),
		:global(tfoot td) {
			@extend %Table-solidMeta;
		}
		:global(tr:nth-of-type(even)) {
			@extend %Table-solidEvenRow;
		}
	}
</style>
