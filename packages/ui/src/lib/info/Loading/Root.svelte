<script lang="ts">
	import type { RootProps } from './props.ts';

	const { size, ...attributes }: RootProps = $props();
</script>

<span
	class="container"
	data-size={size ?? 'md'}
	{...attributes}
>
	<span
		class="dot"
		data-index={0}
	>
	</span>
	<span
		class="dot"
		data-index={1}
	>
	</span>
	<span
		class="dot"
		data-index={2}
	>
	</span>
</span>

<style lang="scss">
	@use '../../visual/Avatar/Avatar.scss' as *;
	@use '../../common.scss' as *;
	@use 'sass:list';

	$component-sizes: create-size-map((0.65rem, 0.75rem, 0.85rem, 1.25rem, 1.5rem));

	@keyframes dot-animation {
		0% {
			transform: translateY(0) scale(0.9);
			opacity: 50%;
		}
		50% {
			opacity: 100%;
			transform: translateY(-50%) scale(1);
		}
		100% {
			opacity: 50%;
			transform: translateY(0) scale(0.9);
		}
	}

	.container {
		display: inline-flex;
		flex-direction: row;
		align-items: center;

		@each $size, $value in $component-sizes {
			&[data-size='#{$size}'] {
				gap: calc($value / 2);
				.dot {
					width: $value;
					height: $value;
				}
			}
		}
	}
	.dot {
		box-sizing: border-box;
		background-color: var(--neutral-solidBack);
		animation: dot-animation infinite 2s ease-in-out;

		@for $i from 0 through 2 {
			&[data-index='#{$i}'] {
				animation-delay: calc(200ms * $i);
			}
		}

		@extend %Squircle;
	}
</style>
