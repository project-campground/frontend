<script lang="ts">
	import { capitalize } from '$lib/util/component.js';
	import { getMenuList, type MenuListOnAction } from './context.svelte.ts';
	import type { MenuItemProps } from './props.ts';

	const {
		children,
		class: className,
		color,
		onclick,
		value: actionValue,
		...attributes
	}: MenuItemProps = $props();

	const menuList = getMenuList();
	const action = menuList.onaction;
</script>

<li
	class={['Menu MenuItem container', color && `color${capitalize(color)}`, className]}
	role="menuitem"
	{...attributes}
>
	<button
		class={['Menu MenuItem button']}
		onclick={(ev) => onclick?.(ev) ?? $action?.(actionValue)}
	>
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

		color: var(--palette-foreground-level2);
		border-radius: var(--radius-sm);

		font-family: var(--font-body);
		font-weight: 500;
		font-size: 1em;
		text-align: left;
		cursor: pointer;
		display: flex;
		flex-direction: row;

		@include button-transform();

		&:not(:disabled):hover {
			color: var(--palette-foreground-level1);
			background-color: var(--palette-background-level3);
		}
		@each $color in $color-types {
			.color#{capitalize($color)} > & {
				color: var(--palette-#{$color}-400);
				&:not(:disabled) {
					&:hover {
						background-color: var(--palette-#{$color}-900);
						color: var(--palette-#{$color}-300);
					}
					&:active,
					&:hover:active {
						background-color: var(--palette-#{$color}-950);
						color: var(--palette-#{$color}-400);
					}
				}
			}
		}
	}
</style>
