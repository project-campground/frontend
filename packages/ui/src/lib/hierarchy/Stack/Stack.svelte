<script lang="ts">
	import { rem } from '../../util/component.js';
	import type StackProps from './props.ts';

	const {
		children,
		class: className,
		// Flex
		gap,
		align,
		direction,
		directionMobile,
		wrap,
		...attributes
	}: StackProps = $props();
</script>

<div
	{...attributes}
	style:--Stack-gap={rem(gap ?? 1)}
	class={['Stack', className]}
	data-wrap={wrap}
	data-direction-mobile={directionMobile}
	data-direction={direction}
	data-align={align ?? 'stretch'}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../index.scss' as *;

	$directions: column, column-reverse, row, row-reverse;
	$aligns: start, stretch, center, end;
	$wraps: wrap, nowrap, wrap-reverse;

	.Stack {
		display: flex;
		flex-direction: column;
		gap: var(--Stack-gap);

		@each $direction in $directions {
			&[data-direction='#{$direction}'] {
				flex-direction: $direction;
			}
		}
		@each $align in $aligns {
			&[data-align='#{$align}'] {
				align-items: $align;
			}
		}
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
