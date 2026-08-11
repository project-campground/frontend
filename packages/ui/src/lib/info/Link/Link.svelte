<script lang="ts">
	import type LinkProps from './props.ts';

	const {
		children,
		color,
		underlined,
		fullWidth,
		class: className,
		...attributes
	}: LinkProps = $props();
</script>

<a
	class={[{ fullWidth }, className]}
	{...attributes}
	data-color={color ?? 'primary'}
	data-underlined={underlined ?? 'hover'}
>
	{@render children()}
</a>

<style lang="scss">
	@use '../../common.scss' as *;

	a {
		display: inline-flex;

		text-decoration-line: underline;
		text-decoration-color: transparent;

		flex-direction: row;
		align-items: center;
		gap: 1ex;
		transition-property: border-bottom-color, color, transform;
		transition-duration: 0.2s;

		@include button-transform();

		&[data-underlined='hover'],
		&[data-underlined='never'] {
			text-decoration-color: transparent;
		}

		&[data-underlined='always']:hover,
		&[data-underlined='hover']:hover {
			text-decoration-color: inherit;
		}

		&.fullWidth {
			display: flex;
			width: 100%;
		}

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
				}
				&:not(:disabled):active {
					color: var(--#{$col}-plainForeActive);
				}
			}
		}
	}
</style>
