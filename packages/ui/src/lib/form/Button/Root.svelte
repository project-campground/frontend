<script lang="ts">
	import type ButtonProps from './props.ts';

	const { children, size, variant, justify, color, padding, ...attributes }: ButtonProps = $props();
</script>

<button
	{...attributes}
	data-size={size ?? 'md'}
	data-variant={variant ?? 'glow'}
	data-color={color ?? 'primary'}
	data-padding={padding}
	data-justify={justify}
>
	{@render children()}
</button>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './Button.scss' as *;
	@use '../../hierarchy/Stack/Stackable.scss' as *;
	@use 'sass:list';

	$regular-variants: plain, selected, soft;

	button {
		position: relative;
		gap: 0.5rem;
		outline: none;
		border-radius: var(--Button-radius);

		flex-direction: row;
		display: flex;
		align-items: center;
		justify-content: center;

		font-weight: bold;
		font-family: var(--font-body);

		cursor: pointer;

		&:disabled {
			cursor: not-allowed;
		}
		&:focus-visible {
			transform: scale(1.15);
		}
		@extend %Button-transform;
		@extend %Button-sizing;
		@extend %Button-sizingWithTypes;
		@extend %Stackable-justify;
		@each $col in $color-types-all {
			&[data-color='#{$col}'] {
				&[data-variant='glow'] {
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
				@each $variant in $regular-variants {
					&[data-variant='#{$variant}'] {
						border: none;
						background: var(--#{$col}-#{$variant}Back);
						color: var(--#{$col}-#{$variant}Fore);
						&:not(:disabled):hover {
							color: var(--#{$col}-#{$variant}ForeHover);
							background: var(--#{$col}-#{$variant}BackHover);
						}
						&:not(:disabled):active {
							color: var(--#{$col}-#{$variant}ForeActive);
							background: var(--#{$col}-#{$variant}BackActive);
						}
						&:disabled {
							background: var(--#{$col}-#{$variant}BackDisabled);
							color: var(--#{$col}-#{$variant}ForeDisabled);
						}
					}
				}
			}
		}
	}
</style>
