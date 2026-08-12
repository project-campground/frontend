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

		flex-direction: row;
		align-items: center;
		gap: 1ch;
		transition-property: text-decoration-color, color, transform;
		transition-duration: 0.2s;

		@include button-transform();

		&[href]:not(:disabled) {
			cursor: pointer;
		}
		&[data-underlined='hover']:not(:hover),
		&[data-underlined='never'] {
			text-decoration-color: transparent;
		}

		&.fullWidth {
			display: flex;
			width: 100%;
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
