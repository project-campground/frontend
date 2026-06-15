import type { ComponentColorAll } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLLiAttributes, HTMLMenuAttributes } from 'svelte/elements';

export type MenuPlacementHorizontal = 'left' | 'center' | 'right';
export type MenuPlacementVertical = 'top' | 'middle' | 'bottom';
export type MenuPlacement = Exclude<
	`${MenuPlacementVertical}-${MenuPlacementHorizontal}`,
	'middle-center'
>;
export interface MenuListProps extends HTMLMenuAttributes {
	children?: Snippet;
	invokerRect?: DOMRect;
	placement?: MenuPlacement;
}
export interface MenuItemProps extends HTMLLiAttributes {
	children?: Snippet;
	color?: ComponentColorAll;
}
