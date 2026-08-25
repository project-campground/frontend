<script lang="ts">
	import { rem } from '../../util/component.js';
	import { stackableProps } from '../layout.ts';
	import type StackProps from './props.ts';

	const {
		children,
		class: className,
		// Flex
		gap,
		flex,
		gridColumn,
		gridRow,
		...attributes
	}: StackProps = $props();
</script>

<div
	style:--Stack-gap={rem(gap ?? 1)}
	style:--Layout-flex={flex}
	style:--Layout-gridColumn={gridColumn}
	style:--Layout-gridRow={gridRow}
	class={['Stack', className]}
	{...stackableProps(attributes)}
>
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../common.scss' as *;
	@use '../Layout.scss' as *;

	.Stack {
		display: flex;
		flex-direction: column;
		gap: var(--Stack-gap);

		@extend %Stackable;
		@extend %InLayout;

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
