import type { ComponentColorAll, ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends HTMLAttributes<HTMLSpanElement> {
	color?: ComponentColorAll;
	size?: ComponentSize;
	children: Snippet;
}
