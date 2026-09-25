import type { MenuPortalInstance } from '$lib/floating/MenuPortalContainer/portals.svelte.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	instance: MenuPortalInstance;
}
