import type { ComponentSizeWithNone } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface SkeletonProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	radius?: ComponentSizeWithNone | 'avatar';
	children?: Snippet;
}
