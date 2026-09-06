import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export interface RootProps {
	value?: number;
	onChange?: (value: number) => unknown;
	children: Snippet;
}
export interface ItemProps extends HTMLButtonAttributes {
	children: Snippet;
}
export interface ListProps extends Omit<HTMLAttributes<HTMLElementTagNameMap['div']>, 'size'> {
	size?: ComponentSize;
	children: Snippet;
}
