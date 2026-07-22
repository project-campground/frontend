import type { MenuPortalInstance } from '$lib/floating/MenuPortalContainer/portals.svelte.js';
import type { ComponentColorAll } from '$lib/types/attributes.js';
import type { DistanceArgument } from '$lib/util/component.js';
import type { AutoPlacementOptions, Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import type {
	HTMLAnchorAttributes,
	HTMLAttributes,
	HTMLButtonAttributes,
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
	placement?: Placement;
	offset?: number;
	autoPlacement?: AutoPlacementOptions;
	instance: MenuPortalInstance;

	w?: DistanceArgument;
	h?: DistanceArgument;
	maxw?: DistanceArgument;
	maxh?: DistanceArgument;
	minw?: DistanceArgument;
	minh?: DistanceArgument;
}
export interface ListProps extends HTMLMenuAttributes {
	children?: Snippet;
	invokerRect?: DOMRect;
	placement?: MenuPlacement;
}
export interface ItemProps extends HTMLLiAttributes {
	children?: Snippet;
}
export interface ButtonProps extends HTMLButtonAttributes {
	left?: Snippet;
	right?: Snippet;
	children?: Snippet;
	color?: ComponentColorAll;
	onclick?: MouseEventHandler<HTMLButtonElement>;
}
export interface LinkProps extends HTMLAnchorAttributes {
	children?: Snippet;
}
