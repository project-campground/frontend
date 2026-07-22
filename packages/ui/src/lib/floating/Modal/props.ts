import type { MenuPortalInstance } from '$lib/floating/MenuPortalContainer/portals.svelte.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type ModalSize = 'auto' | 'max' | 'full';

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	instance: MenuPortalInstance;
}
export interface DialogProps extends HTMLAttributes<HTMLElementTagNameMap['article']> {
	size?: ModalSize | null;
	children?: Snippet;
}
