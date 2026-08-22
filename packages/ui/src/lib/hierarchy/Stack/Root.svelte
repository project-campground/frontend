<script lang="ts">
	import { rem } from '../../util/component.js';
	import type StackProps from './props.ts';

	const {
		children,
		class: className,
		// Flex
		gap,
		align,
		justify,
		direction,
		directionMobile,
		flex,
		wrap,
		...attributes
	}: StackProps = $props();
</script>

<div
	{...attributes}
	style:--Stack-gap={rem(gap ?? 1)}
	style:--Stack-flex={flex}
	class={['Stack', className]}
	data-wrap={wrap}
	data-direction-mobile={directionMobile}
	data-direction={direction}
	data-align={align ?? 'stretch'}
	data-justify={justify}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use './Stackable.scss' as *;

	$aligns: start, stretch, center, end;
	$wraps: wrap, nowrap, wrap-reverse;
	$justifies: start, baseline, center, end;

	.Stack {
		display: flex;
		flex-direction: column;
		gap: var(--Stack-gap);
		flex: var(--Stack-flex);

		@extend %Stackable-direction;
		@extend %Stackable-align;
		@extend %Stackable-justify;

		@each $wrap in $wraps {
			&[data-wrap='#{$wrap}'] {
				flex-wrap: $wrap;
			}
		}
		@include tablet-down() {
			@each $direction in $directions {
				&[data-direction-mobile='#{$direction}'] {
					flex-direction: $direction;
				}
			}
		}
	}
</style>
