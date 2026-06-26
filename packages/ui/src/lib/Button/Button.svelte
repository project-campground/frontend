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
			cursor: not-allowed;
		}
		&:focus-visible {
			transform: scale(1.15);
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
					background: linear-gradient(
						to bottom right,
						var(--#{$col}-glowFirst),
						var(--#{$col}-glowSecond)
					);
					color: var(--#{$col}-glowFore);
					border: none;
					box-shadow: 0 0 8px var(--#{$col}-glowFirst);
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
					&:disabled {
						background: linear-gradient(
							to bottom right,
							var(--#{$col}-glowFirstDisabled),
							var(--#{$col}-glowSecondDisabled)
						);
						box-shadow: none;
					}
					&:not(:disabled):hover {
						box-shadow: 0 0 15px var(--#{$col}-glowFirst);
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
				&.variantPlain {
					border: none;
					background-color: transparent;
					color: var(--#{$col}-plainFore);
					&:not(:disabled):hover {
						color: var(--#{$col}-plainForeHover);
						background-color: var(--#{$col}-plainBackHover);
					}
					&:not(:disabled):active {
						color: var(--#{$col}-plainForeActive);
						background-color: var(--#{$col}-plainBackActive);
					}
					&:disabled {
						background-color: transparent;
						color: var(--#{$col}-plainForeDisabled);
					}
				}
				&.variantSoft {
					border: none;
					background-color: var(--#{$col}-softBack);
					color: var(--#{$col}-softFore);
					&:disabled {
						color: var(--#{$col}-softForeDisabled);
						background-color: var(--#{$col}-softBackDisabled);
					}
					&:not(:disabled):hover {
						color: var(--#{$col}-softForeHover);
						background-color: var(--#{$col}-softBackHover);
					}
					&:not(:disabled):active {
						color: var(--#{$col}-softForeActive);
						background-color: var(--#{$col}-softBackActive);
					}
				}
				&.variantInverted {
					border: none;
					background-color: var(--#{$col}-invertedBack);
					color: var(--#{$col}-invertedFore);
					&:not(:disabled):hover {
						color: var(--#{$col}-invertedForeHover);
						background-color: var(--#{$col}-invertedBackHover);
					}
					&:not(:disabled):active {
						color: var(--#{$col}-softForeActive);
						background-color: var(--#{$col}-invertedBackActive);
					}
				}
			}
		}
	}
</style>
