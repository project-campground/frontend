import type { ComponentColorAll, ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';

export interface RootProps {
	color?: ComponentColorAll;
	size?: ComponentSize;
	children: Snippet;
}
