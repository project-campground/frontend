import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';

export interface RootProps {
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	children: Snippet;
	overflow?: 'auto' | 'visible';
}
export interface ContentProps {
	gap?: ComponentSize;
	class?: ClassValue;
	children: Snippet;
}
export interface OverflowProps {
	class?: ClassValue;
	children: Snippet;
}
export interface LinkProps extends HTMLAnchorAttributes {
	class?: ClassValue;
}
