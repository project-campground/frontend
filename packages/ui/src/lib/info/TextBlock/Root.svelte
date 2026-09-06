<script lang="ts">
	import { em, toSpacingPx } from '../../util/component.ts';
	import { baseTextProps } from '../props.ts';
	import type TextBlockProps from './props.ts';

	const {
		children,
		class: className,
		hideOnMobile,
		pl,
		pr,
		float,
		level,
		align,
		fontSize,
		...props
	}: TextBlockProps = $props();
</script>

<span
	class={[hideOnMobile && `hideOnMobile`, className]}
	data-float={float}
	data-align={align}
	data-level={level}
	{...baseTextProps(props)}
	style:--BaseText-fontSize={em(fontSize)}
	style:--TextBlock-paddingLeft={toSpacingPx(pl)}
	style:--TextBlock-paddingRight={toSpacingPx(pr)}
>
	{@render children?.()}
</span>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Text.scss' as *;

	$levels: background, subtext, body, subheading, heading;
	$floats: left, right;
	$aligns: start, center, end;

	span {
		display: inline;
		align-items: center;
		padding: {
			left: var(--TextBlock-paddingLeft);
			right: var(--TextBlock-paddingRight);
		}

		@extend %Text-base;

		@each $level in $levels {
			&[data-level='#{$level}'] {
				color: var(--foreground-#{$level});
			}
		}

		&.hideOnMobile {
			@include tablet-down {
				display: none;
			}
		}
		@each $float in $floats {
			&[data-float='#{$float}'] {
				float: $float;
			}
		}

		@each $align in $aligns {
			&[data-align='#{$align}'] {
				align-items: $align;
			}
		}
	}
</style>
