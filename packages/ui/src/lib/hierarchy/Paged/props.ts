import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface ItemProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	children: Snippet;
}
export interface RootProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	count: number;
	index: number;
	fullHeight?: boolean;
	children: Snippet;
}
