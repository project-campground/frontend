import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends HTMLAttributes<HTMLElementTagNameMap['table']> {
	size?: ComponentSize;
	height?: 'full';
	children: Snippet;
}
