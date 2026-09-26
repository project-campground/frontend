import type { ComponentSize } from '$lib/types/attributes.js';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends HTMLAttributes<HTMLSpanElement> {
	size?: ComponentSize;
}
