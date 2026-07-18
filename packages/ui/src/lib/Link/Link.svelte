<script lang="ts">
	import type LinkProps from './props.ts';

	const { children, color, underlined, ...attributes }: LinkProps = $props();
</script>

<a
	{...attributes}
	class={['Link', { underlined }]}
	data-color={color ?? 'primary'}
>
	{@render children()}
</a>

<style lang="scss">
	@use '../index.scss' as *;

	.Link {
		display: inline-flex;
		text-decoration: none;
		flex-direction: row;
		align-items: center;
		gap: 1ex;
		border-bottom: solid 1px transparent;
		transition-property: border-bottom-color, color, transform;
		transition-duration: 0.2s;
		@include button-transform();
		&:disabled {
			cursor: not-allowed;
			opacity: 0.65;
			filter: grayscale(65%);
		}
		@each $col in $color-types-all {
			&[data-color='#{$col}'] {
				color: var(--#{$col}-plainFore);
				&:not(:disabled):hover {
					color: var(--#{$col}-plainForeHover);
					border-bottom-color: var(--#{$col}-plainForeHover);
				}
				&.underlined {
					border-bottom-color: var(--#{$col}-plainFore);
				}
				&:not(:disabled):active {
					color: var(--#{$col}-plainForeActive);
					border-bottom-color: var(--#{$col}-plainForeActive);
				}
			}
		}
	}
</style>
