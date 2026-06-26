<script lang="ts">
	import { capitalize } from '$lib/util/component.js';
	import type { MenuItemProps } from './props.ts';

	const { children, class: className, color, onclick, ...attributes }: MenuItemProps = $props();
</script>

<li
	class={['Menu MenuItem container', color && `color${capitalize(color)}`, className]}
	role="menuitem"
	{...attributes}
>
	<button class={['Menu MenuItem button']} {onclick}>
		{@render children?.()}
	</button>
</li>

<style lang="scss">
	@use '../index.scss' as *;

	.container {
		padding: 0;
		margin: 0;
		&::marker {
			display: none;
		}
	}
	.button {
		width: 100%;
		border: none;
		background-color: transparent;
		padding: 0.75rem 1.25rem;

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

		&:not(:disabled):hover {
			color: var(--foreground-heading);
			background-color: var(--background-subcontent);
		}
		@each $color in $color-types {
			.color#{capitalize($color)} > & {
				color: var(--#{$color}-400);
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
	}
</style>
