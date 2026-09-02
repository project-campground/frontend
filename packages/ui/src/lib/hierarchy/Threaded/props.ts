import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	parent: Snippet;
	children?: Snippet;
	direction?: 'to-bottom' | 'to-top';
	size?: ComponentSize;
}
export interface ItemProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	children: Snippet;
}
export interface SubRootProps extends Omit<ItemProps, 'children'>, Omit<RootProps, 'size'> {}
