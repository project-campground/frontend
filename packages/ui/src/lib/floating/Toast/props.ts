import type { ComponentColor } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	color: ComponentColor;
	onClick?: (ev: MouseEvent) => unknown;
	onClose?: (ev: MouseEvent) => unknown;
	children: Snippet;
}
