import type { Size } from '$lib/util/component.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CommonFloatingProps } from '../common-floating.ts';
import type { MenuPortalInstance } from '../MenuPortalContainer/index.ts';

export interface TooltipProps
	extends HTMLAttributes<HTMLDivElement>, Omit<CommonFloatingProps, 'offset' | 'autoPlacement'> {
	children?: Snippet;
	instance: MenuPortalInstance;

	w?: Size;
	h?: Size;
	maxw?: Size;
	maxh?: Size;
	minw?: Size;
	minh?: Size;
}
