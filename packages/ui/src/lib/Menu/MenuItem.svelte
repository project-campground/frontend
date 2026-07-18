<script lang="ts">
	import type { ItemProps } from './props.ts';

	const { children, class: className, color, onclick, ...attributes }: ItemProps = $props();
</script>

<li
	class={['container', className]}
	data-color={color}
	role="menuitem"
	{...attributes}
>
	<button
		class={['button']}
		{onclick}
	>
		{@render children?.()}
	</button>
</li>

<style lang="scss">
	@use '../index.scss' as *;

	.container {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		&::marker {
			display: none;
		}
	}
	.button {
		box-sizing: border-box;
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 0.75rem 1.25rem;

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
		transition-property: color, background;
		transition-duration: $transition-time-sm;

		@each $color in $color-types {
			&[data-color='#{$color}'] > & {
				color: var(--#{$color}-plainFore);
				&:not(:disabled) {
					&:hover {
						color: var(--#{$color}-plainForeHover);
						background-color: var(--#{$color}-plainBackHover);
					}
					&:active,
					&:hover:active {
						color: var(--#{$color}-plainForeActive);
						background-color: var(--#{$color}-plainBackActive);
					}
				}
			}
		}
		&:not(:disabled):hover {
			color: var(--foreground-heading);
			background-color: var(--background-subcontent);
		}
	}
</style>
