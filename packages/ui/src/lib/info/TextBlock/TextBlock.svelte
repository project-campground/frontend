<script lang="ts">
	import { capitalize, toSpacingPx } from '../util/component.ts';
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
		weight,
		fontSize,
	}: TextBlockProps = $props();
</script>

<span
	class={[hideOnMobile && `hideOnMobile`, className]}
	data-float={float}
	data-align={align}
	data-weight={weight}
	data-level={level}
	style:--TextBlock-paddingLeft={toSpacingPx(pl)}
	style:--TextBlock-paddingRight={toSpacingPx(pr)}
	style:--TextBlock-fontSize={typeof fontSize === 'number' ? `${fontSize}rem` : fontSize}
>
	{@render children?.()}
</span>

<style lang="scss">
	@use '../index.scss' as *;

	$levels: background, subtext, body, subheading, heading;
	$floats: left, right;
	$aligns: start, center, end;

	span {
		display: inline-flex;
		align-items: center;
		padding: {
			left: var(--TextBlock-paddingLeft);
			right: var(--TextBlock-paddingRight);
		}
		font-size: var(--TextBlock-fontSize);

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

		@for $i from 5 to 9 {
			$weight: #{calc($i * 100)};
			&[data-weight='#{$weight}'] {
				font-weight: #{$weight};
			}
		}
	}
</style>
