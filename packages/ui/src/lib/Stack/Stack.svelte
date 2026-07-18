<script lang="ts">
	import { toSpacingPx } from '../util/component.ts';
	import type StackProps from './props.ts';

	const {
		children,
		gap,
		class: className,
		direction,
		directionMobile,
		...attributes
	}: StackProps = $props();
</script>

<div
	{...attributes}
	style:--Stack-gap={toSpacingPx(gap ?? 1)}
	class={['Stack', className]}
	data-direction-mobile={directionMobile}
	data-direction={direction}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../index.scss' as *;

	$directions: column, column-reverse, row, row-reverse;

	.Stack {
		display: flex;
		flex-direction: column;
		gap: var(--Stack-gap);

		@each $direction in $directions {
			&[data-direction='#{$direction}'] {
				flex-direction: $direction;
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
