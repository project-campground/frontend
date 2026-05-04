<script lang="ts">
	import { capitalize } from '../../util/component.ts';
	import type ButtonProps from './props.ts';

	const { children, size, variant, color, ...attributes }: ButtonProps = $props();
</script>

<button
	{...attributes}
	class={[
		'Button',
		`size${capitalize(size ?? 'md')}`,
		`variant${capitalize(variant ?? 'glow')}`,
		`color${capitalize(color ?? 'primary')}`
	]}
>
	{@render children()}
</button>

<style lang="scss">
	@use '../index.scss' as *;

	$button-padding: create-size-map((2px 4px, 4px 8px, 8px 24px, 12px 36px, 16px 48px));

	.Button {
		display: flex;
		flex-direction: row;
		gap: 8px;
		font-weight: bold;
		outline: none;
		position: relative;
		border-radius: var(--Button-radius);
		cursor: pointer;
		&:disabled {
			cursor: default;
			opacity: 0.65;
			filter: grayscale(65%);
		}
		@include button-transform();
		@each $size, $values in $button-padding {
			&.size#{capitalize($size)} {
				padding: $values;
				--Button-radius: var(--radius-#{$size});
			}
		}
		@each $col in $color-types {
			&.color#{capitalize($col)} {
				&.variantGlow {
					background: linear-gradient(to bottom right, var(--palette-#{$col}-500), var(--palette-#{$col}-secondary));
					color: var(--palette-#{$col}-solidFore);
					border: none;
					box-shadow: 0 0 8px var(--palette-#{$col}-500);
					&::after {
						content: '';
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						position: absolute;
						background-color: #FFF;
						opacity: 0;
						border-radius: var(--Button-radius);
						transition: opacity 0.2s, background-color 0.2s;
					}
					&:not(:disabled):hover {
						box-shadow: 0 0 15px var(--palette-#{$col}-500);
					}
					&:not(:disabled):hover::after {
						opacity: 25%;
					}
					&:not(:disabled):hover:active::after, &:not(:disabled):active::after {
						opacity: 25%;
						background-color: #000;
					}
				}
				&.variantSolid {
					background-color: var(--palette-#{$col}-solidBack);
					color: var(--palette-#{$col}-solidFore);
					border: none;
					&:not(:disabled):hover {
						background-color: var(--palette-#{$col}-solidBackHover);
					}
					&:not(:disabled):active {
						background-color: var(--palette-#{$col}-solidBackActive);
					}
				}
				&.variantOutlined {
					color: var(--palette-#{$col}-outlinedFore);
					background-color: var(--palette-#{$col}-outlinedBack, transparent);
					border: solid 1px var(--palette-#{$col}-outlinedBorder, transparent);
					&:not(:disabled):hover {
						color: var(--palette-#{$col}-outlinedForeHover);
						background-color: var(--palette-#{$col}-outlinedBackHover, transparent);
						border: solid 1px var(--palette-#{$col}-outlinedBorderHover, transparent);
					}
					&:not(:disabled):active {
						color: var(--palette-#{$col}-outlinedForeActive);
						background-color: var(--palette-#{$col}-outlinedBackActive, transparent);
						border: solid 1px var(--palette-#{$col}-outlinedBorderActive, transparent);
					}
				}
				&.variantPlain {
					border: none;
					background-color: transparent;
					color: var(--palette-#{$col}-plainFore);
					&:not(:disabled):hover {
						color: var(--palette-#{$col}-plainForeHover);
						background-color: var(--palette-#{$col}-plainBackHover, transparent);
					}
					&:not(:disabled):active {
						color: var(--palette-#{$col}-plainForeActive);
						background-color: var(--palette-#{$col}-plainBackActive, transparent);
					}
				}
				&.variantSoft {
					border: none;
					background-color: var(--palette-#{$col}-softBack);
					color: var(--palette-#{$col}-softFore);
					&:not(:disabled):hover {
						color: var(--palette-#{$col}-softForeHover);
						background-color: var(--palette-#{$col}-softBackHover, transparent);
					}
					&:not(:disabled):active {
						color: var(--palette-#{$col}-softForeActive);
						background-color: var(--palette-#{$col}-softBackActive, transparent);
					}
				}
			}
		}
	}
</style>
