<script lang="ts">
	import { capitalize } from '../util/component.ts';
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

	button {
		display: flex;
		flex-direction: row;
		gap: 8px;
		font-weight: bold;
		outline: none;
		position: relative;
		border-radius: var(--Button-radius);
		cursor: pointer;
		align-items: center;
		font-family: var(--font-body);
		&:disabled {
			cursor: default;
			opacity: 0.65;
			filter: grayscale(65%);
		}
		&:focus-visible {
			transform: scale(1.15);
			filter: brightness(1.5);
		}
		@include button-transform();
		@each $size, $values in $button-padding {
			&.size#{capitalize($size)} {
				padding: $values;
				--Button-radius: var(--radius-#{$size});
			}
		}
		@each $col in $color-types-all {
			&.color#{capitalize($col)} {
				&.variantGlow {
					background: linear-gradient(to bottom right, var(--#{$col}-500), var(--#{$col}-alt));
					color: var(--#{$col}-solidFore);
					border: none;
					box-shadow: 0 0 8px var(--#{$col}-500);
					&::after {
						content: '';
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						position: absolute;
						background-color: #fff;
						opacity: 0;
						border-radius: var(--Button-radius);
						transition:
							opacity 0.2s,
							background-color 0.2s;
					}
					&:not(:disabled):hover {
						box-shadow: 0 0 15px var(--#{$col}-500);
					}
					&:not(:disabled):hover::after {
						opacity: 25%;
					}
					&:not(:disabled):hover:active::after,
					&:not(:disabled):active::after {
						opacity: 25%;
						background-color: #000;
					}
				}
				&.variantSolid {
					background-color: var(--#{$col}-solidBack);
					color: var(--#{$col}-solidFore);
					border: none;
					&:not(:disabled):hover {
						background-color: var(--#{$col}-solidBackHover);
					}
					&:not(:disabled):active {
						background-color: var(--#{$col}-solidBackActive);
					}
				}
				&.variantInverted {
					background-color: var(--#{$col}-50);
					color: var(--#{$col}-500);
					border: none;
					&:not(:disabled):hover {
						background-color: var(--#{$col}-150);
					}
					&:not(:disabled):active {
						background-color: var(--#{$col}-250);
					}
				}
				&.variantOutlined {
					color: var(--#{$col}-outlinedFore);
					background-color: var(--#{$col}-outlinedBack, transparent);
					border: solid 1px var(--#{$col}-outlinedBorder, transparent);
					&:not(:disabled):hover {
						color: var(--#{$col}-outlinedForeHover);
						background-color: var(--#{$col}-outlinedBackHover, transparent);
						border: solid 1px var(--#{$col}-outlinedBorderHover, transparent);
					}
					&:not(:disabled):active {
						color: var(--#{$col}-outlinedForeActive);
						background-color: var(--#{$col}-outlinedBackActive, transparent);
						border: solid 1px var(--#{$col}-outlinedBorderActive, transparent);
					}
				}
				&.variantPlain {
					border: none;
					background-color: transparent;
					color: var(--#{$col}-plainFore);
					&:not(:disabled):hover {
						color: var(--#{$col}-plainForeHover);
						background-color: var(--#{$col}-plainBackHover, transparent);
					}
					&:not(:disabled):active {
						color: var(--#{$col}-plainForeActive);
						background-color: var(--#{$col}-plainBackActive, transparent);
					}
				}
				&.variantSoft {
					border: none;
					background-color: var(--#{$col}-softBack);
					color: var(--#{$col}-softFore);
					&:not(:disabled):hover {
						color: var(--#{$col}-softForeHover);
						background-color: var(--#{$col}-softBackHover, transparent);
					}
					&:not(:disabled):active {
						color: var(--#{$col}-softForeActive);
						background-color: var(--#{$col}-softBackActive, transparent);
					}
				}
			}
		}
	}
</style>
