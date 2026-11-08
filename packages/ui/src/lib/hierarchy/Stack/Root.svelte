<script lang="ts">
	import { notInherited, rem } from '../../util/component.js';
	import { stackedProps } from '../layout.ts';
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
	style:--Layout-flex={notInherited(flex)}
	style:--Layout-gridColumn={notInherited(gridColumn)}
	style:--Layout-gridRow={notInherited(gridRow)}
	class={['Stack', className]}
	{...stackedProps(attributes)}
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

		@extend %Stacked;
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
