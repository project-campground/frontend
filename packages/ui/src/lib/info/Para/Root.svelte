<script lang="ts">
	import { em } from '$lib/util/component.ts';
	import { baseTextProps } from '../props.ts';
	import type ParaProps from './props.ts';

	const {
		children,
		class: className,
		level,
		lineHeight,
		color,
		align,
		fontSize,
		mv: vMargin,
		letterSpacing,
		mt: tMargin,
		mb: bMargin,
		...props
	}: ParaProps = $props();
</script>

<svelte:element
	this={level?.startsWith('h') ? level : 'p'}
	class={['Para', className]}
	data-level={level}
	data-align={align}
	data-color={color}
	data-v-margin={vMargin}
	data-t-margin={tMargin}
	data-b-margin={bMargin}
	{...baseTextProps(props)}
	style:--BaseText-fontSize={em(fontSize)}
	style:--Para-lineHeight={em(lineHeight)}
	style:--Para-letterSpacing={em(letterSpacing)}
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	@use 'sass:list';
	@use '../../common.scss' as *;
	@use '../Text.scss' as *;

	$hLevels:
		1 2em,
		2 1.5em,
		3 1.17em,
		4 1em,
		5 0.83em,
		6 0.67em;
	$margins: 0 0.125em 0.25em 0.5em 1em 1.5em 2.5em 3.5em;
	$margin-size-map: create-size-map-using($margins, $size-names-with-none);
	$aligns: left, center, right, justify;
	$text-wraps: wrap, nowrap, balance, pretty, stable;

	.Para {
		display: block;
		font-size: var(--Para-fontSize, 1em);
		letter-spacing: var(--Para-letterSpacing, 0px);
		line-height: var(--Para-lineHeight);

		color: var(--foreground-subheading);
		margin: 0;

		@extend %Text-base;

		@each $level in $hLevels {
			$index: list.nth($level, 1);
			$fontSize: list.nth($level, 2);
			&[data-level='h#{$index}'] {
				color: var(--foreground-heading);
				font-family: var(--font-display);
				font-size: var(--Para-fontSize, #{$fontSize});
			}
		}
		&[data-level='sub0'] {
			color: var(--foreground-subtext);
		}
		&[data-level='sub1'] {
			color: var(--foreground-background);
		}

		@each $color in $color-types {
			&[data-color='#{$color}'] {
				color: var(--#{$color}-plainFore);
				@each $level in $hLevels {
					$index: list.nth($level, 1);
					&[data-level='h#{$index}'] {
						color: var(--#{$color}-plainForeHeading);
					}
				}
				&[data-level='sub0'] {
					color: var(--#{$color}-plainForeSubtext);
				}
				&[data-level='sub1'] {
					color: var(--#{$color}-plainForeBackground);
				}
			}
		}

		@each $align in $aligns {
			&[data-align='#{$align}'] {
				text-align: $align;
			}
		}
		@each $wrap in $text-wraps {
			&[data-text-wrap='#{$wrap}'] {
				text-wrap: $wrap;
			}
		}

		@each $key, $value in $margin-size-map {
			&[data-v-margin='#{$key}'] {
				margin: $value 0;
			}
			&[data-t-margin='#{$key}'] {
				margin-top: $value;
			}
			&[data-b-margin='#{$key}'] {
				margin-bottom: $value;
			}
		}
	}
</style>
