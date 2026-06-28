<script lang="ts">
	import { capitalize } from '../util/component.ts';
	import type ParaProps from './props.ts';

	const {
		children,
		class: className,
		level,
		lineHeight,
		color,
		align,
		weight,
		fontSize,
		vMargin,
		letterSpacing,
		tMargin,
		bMargin,
	}: ParaProps = $props();
</script>

<svelte:element
	this={level?.startsWith('h') ? level : 'p'}
	class={[
		'Para',
		level && `level${capitalize(level)}`,
		align && `align${capitalize(align)}`,
		weight && `weight${weight}`,
		color && `color${capitalize(color)}`,
		vMargin && `vMargin${capitalize(vMargin)}`,
		tMargin && `tMargin${capitalize(tMargin)}`,
		bMargin && `bMargin${capitalize(bMargin)}`,
		className,
	]}
	style:--Para-fontSize={typeof fontSize === 'number' ? `${fontSize}rem` : fontSize}
	style:--Para-lineHeight={typeof lineHeight === 'number' ? `${lineHeight}rem` : lineHeight}
	style:--Para-letterSpacing={typeof letterSpacing === 'number' ?
		`${letterSpacing}px`
	:	letterSpacing}
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	@use 'sass:list';
	@use '../index.scss' as *;

	$hLevels:
		1 2em,
		2 1.5em,
		3 1.17em,
		4 1em,
		5 0.83em,
		6 0.67em;
	$margins: 0 0.125em 0.25em 0.5em 1em 2em 3em;
	$margin-size-map: create-size-map-using($margins, $size-names-with-none);

	.Para {
		display: block;
		font-size: var(--Para-fontSize, 1em);
		letter-spacing: var(--Para-letterSpacing, 0px);
		line-height: var(--Para-lineHeight);

		color: var(--foreground-subheading);
		margin: 0;

		@each $level in $hLevels {
			$index: list.nth($level, 1);
			$fontSize: list.nth($level, 2);
			&.levelH#{$index} {
				color: var(--foreground-heading);
				font-family: var(--font-display);
				font-size: var(--Para-fontSize, #{$fontSize});
			}
		}
		&.levelSub0 {
			color: var(--foreground-subtext);
		}
		&.levelSub1 {
			color: var(--foreground-background);
		}

		@each $color in $color-types {
			&.color#{capitalize($color)} {
				color: var(--#{$color}-plainFore);
				@each $level in $hLevels {
					$index: list.nth($level, 1);
					&.levelH#{$index} {
						color: var(--#{$color}-plainForeHeading);
					}
				}
				&.levelSub0 {
					color: var(--#{$color}-plainForeSubtext);
				}
				&.levelSub1 {
					color: var(--#{$color}-plainForeBackground);
				}
			}
		}

		&.alignLeft {
			text-align: left;
		}
		&.alignCenter {
			text-align: center;
		}
		&.alignJustify {
			text-align: justify;
		}
		&.alignRight {
			text-align: right;
		}

		&.weight500 {
			font-weight: 500;
		}
		&.weight600 {
			font-weight: 600;
		}
		&.weight700 {
			font-weight: 700;
		}
		&.weight800 {
			font-weight: 800;
		}
		&.weight900 {
			font-weight: 900;
		}

		@each $key, $value in $margin-size-map {
			&.vMargin#{capitalize($key)} {
				margin: $value 0;
			}
			&.tMargin#{capitalize($key)} {
				margin-top: $value;
			}
			&.bMargin#{capitalize($key)} {
				margin-bottom: $value;
			}
		}
	}
</style>
