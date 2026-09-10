import type { MenuPortalInstance } from '$lib/floating/MenuPortalContainer/portals.svelte.js';
import type { Size } from '$lib/util/component.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLLiAttributes, HTMLMenuAttributes } from 'svelte/elements';
import type { CommonFloatingProps, MenuPlacement } from '../common-floating.ts';
import type NormalButtonProps from '../../form/Button/props.ts';
import type { ComponentSize, ComponentSizeWithNone } from '$lib/types/attributes.js';

export interface RootProps<T extends Event = Event>
	extends HTMLAttributes<HTMLDivElement>, CommonFloatingProps {
	children?: Snippet;
	instance: MenuPortalInstance<T>;
	virtual?: { x: number; y: number; width?: number; height?: number };

	w?: Size;
	h?: Size;
	maxw?: Size;
	maxh?: Size;
	minw?: Size;
	minh?: Size;
}
export interface ListProps extends HTMLMenuAttributes {
	children?: Snippet;
	size?: ComponentSize;
}
export interface ItemProps extends HTMLLiAttributes {
	size?: ComponentSizeWithNone;
	padding?: 'default' | 'no-inline';
	children?: Snippet;
}
export interface ButtonProps extends NormalButtonProps {}
