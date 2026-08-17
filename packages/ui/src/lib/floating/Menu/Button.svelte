<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ButtonProps } from './props.ts';

	const {
		children,
		left,
		right,
		class: className,
		color,
		onclick,
		...attributes
	}: ButtonProps = $props();
</script>

{#snippet decorator(snippet?: Snippet)}
	{#if snippet}
		<span class="decorator">
			{@render snippet()}
		</span>
	{/if}
{/snippet}

<button
	class={['container', className]}
	{onclick}
	data-color={color}
	{...attributes}
>
	{@render decorator(left)}
	<span class="content">
		{@render children?.()}
	</span>
	{@render decorator(right)}
</button>

<style lang="scss">
	@use '../../common.scss' as *;

	.container {
		box-sizing: border-box;
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 0.5rem 1rem;

		gap: 1ch;

		color: var(--foreground-subheading);
		border-radius: var(--radius-sm);

		font-family: var(--font-body);
		font-weight: 500;
		font-size: 1em;
		text-align: left;
		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;

		transition-duration: $transition-time-sm;
		transition-property: background, color, transform, opacity, border-color, box-shadow;
		transition-timing-function: ease-out;

		@each $color in $color-types {
			&[data-color='#{$color}'] {
				color: var(--#{$color}-plainFore);
				.decorator {
					color: var(--#{$color}-plainFore);
				}
				&:not(:disabled) {
					&:hover {
						color: var(--#{$color}-plainForeHover);
						background-color: var(--#{$color}-plainBackHover);
						.decorator {
							color: var(--#{$color}-plainForeHover);
						}
					}
					&:active,
					&:hover:active {
						color: var(--#{$color}-plainForeActive);
						background-color: var(--#{$color}-plainBackActive);
						.decorator {
							color: var(--#{$color}-plainForeActive);
						}
					}
				}
			}
		}
		&:not(:disabled):hover {
			color: var(--foreground-heading);
			background-color: var(--neutral-softBackHover);
			.decorator {
				color: var(--foreground-subheading);
			}
		}
		&:not(:disabled):active,
		&:not(:disabled):hover:active {
			color: var(--foreground-body);
			background-color: var(--neutral-softBackActive);
			transform: scaleY(0.9) scaleX(0.985);
			.decorator {
				color: var(--foreground-subtext);
			}
		}
	}
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5ch;
		flex: 1;
	}
	.decorator {
		line-height: 0;
		transition-property: color;
		transition-duration: $transition-time-sm;

		color: var(--foreground-body);
	}
</style>
