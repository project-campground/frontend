<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { capitalize, toSpacingPx } from '../util/component.ts';

	export interface Props {
		fontSize?: number | string;
		weight?: 500 | 600 | 700 | 800 | 900;
		align?: 'top' | 'center' | 'bottom';
		float?: 'left' | 'right';
		pl?: number;
		pr?: number;
		hideOnMobile?: boolean;
		class?: ClassValue;
		children?: Snippet;
	}

	const {
		children,
		class: className,
		hideOnMobile,
		pl,
		pr,
		float,
		align,
		weight,
		fontSize
	}: Props = $props();
</script>

<span
	class={[
		'TextBlock',
		hideOnMobile && `hideOnMobile`,
		float && `float${capitalize(float)}`,
		align && `align${capitalize(align)}`,
		weight && `weight${weight}`,
		className
	]}
	style:--TextBlock-paddingLeft={toSpacingPx(pl)}
	style:--TextBlock-paddingRight={toSpacingPx(pr)}
	style:--TextBlock-fontSize={typeof fontSize === 'number' ? `${fontSize}rem` : fontSize}
>
	{@render children?.()}
</span>

<style lang="scss">
	@use './index.scss' as *;

	.TextBlock {
		display: inline-block;
		vertical-align: center;
		padding: {
			left: var(--TextBlock-paddingLeft);
			right: var(--TextBlock-paddingRight);
		}
		font-size: var(--TextBlock-fontSize);
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
			vertical-align: top;
		}
		&.alignCenter {
			vertical-align: center;
		}
		&.alignBottom {
			vertical-align: bottom;
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
