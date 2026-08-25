import type { MenuPortalInstance } from '$lib/floating/MenuPortalContainer/portals.svelte.js';
import type { ComponentColorAll } from '$lib/types/attributes.js';
import type { DistanceArgument } from '$lib/util/component.js';
import type { Snippet } from 'svelte';
import type {
	HTMLAttributes,
	HTMLButtonAttributes,
	HTMLLiAttributes,
	HTMLMenuAttributes,
	MouseEventHandler,
} from 'svelte/elements';
import type { CommonFloatingProps, MenuPlacement } from '../common-floating.ts';

export interface RootProps extends HTMLAttributes<HTMLDivElement>, CommonFloatingProps {
	children?: Snippet;
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
