<script lang="ts">
	import LetterVSmall from '@tabler/icons-svelte/icons/letter-v-small';
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
	class={[
		'TextBlock',
		hideOnMobile && `hideOnMobile`,
		float && `float${capitalize(float)}`,
		align && `align${capitalize(align)}`,
		weight && `weight${weight}`,
		level && `level${capitalize(level)}`,
		className,
	]}
	style:--TextBlock-paddingLeft={toSpacingPx(pl)}
	style:--TextBlock-paddingRight={toSpacingPx(pr)}
	style:--TextBlock-fontSize={typeof fontSize === 'number' ? `${fontSize}rem` : fontSize}
>
	{@render children?.()}
</span>

<style lang="scss">
	@use '../index.scss' as *;

	$levels: background, subtext, body, subheading, heading;

	.TextBlock {
		display: inline-flex;
		align-items: center;
		padding: {
			left: var(--TextBlock-paddingLeft);
			right: var(--TextBlock-paddingRight);
		}
		font-size: var(--TextBlock-fontSize);

		@each $level in $levels {
			&.level#{capitalize($level)} {
				color: var(--foreground-#{$level});
			}
		}

		&.hideOnMobile {
			@include tablet-down {
				display: none;
			}
		}
		&.floatLeft {
			float: left;
		}
		&.floatRight {
			float: right;
		}
		&.alignTop {
			align-items: start;
		}
		&.alignCenter {
			align-items: center;
		}
		&.alignBottom {
			align-items: end;
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
	}
</style>
