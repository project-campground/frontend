import type { MenuPortalInstance } from '$lib/MenuPortalContainer/portals.svelte.js';
import type { ComponentColorAll } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type {
	HTMLAttributes,
	HTMLLiAttributes,
	HTMLMenuAttributes,
	MouseEventHandler,
} from 'svelte/elements';

export type MenuPlacementHorizontal = 'left' | 'center' | 'right';
export type MenuPlacementVertical = 'top' | 'middle' | 'bottom';
export type MenuPlacement = Exclude<
	`${MenuPlacementVertical}-${MenuPlacementHorizontal}`,
	'middle-center'
>;
export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	instance: MenuPortalInstance;
}
export interface ListProps extends HTMLMenuAttributes {
	children?: Snippet;
	invokerRect?: DOMRect;
	placement?: MenuPlacement;
}
export interface ItemProps extends Omit<HTMLLiAttributes, 'onclick' | 'value'> {
	children?: Snippet;
	color?: ComponentColorAll;
	onclick?: MouseEventHandler<HTMLButtonElement>;
}
