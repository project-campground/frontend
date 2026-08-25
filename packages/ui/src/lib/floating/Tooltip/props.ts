import type { DistanceArgument } from '$lib/util/component.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { CommonFloatingProps } from '../common-floating.ts';
import type { MenuPortalInstance } from '../MenuPortalContainer/index.ts';

export interface TooltipProps
	extends HTMLAttributes<HTMLDivElement>, Omit<CommonFloatingProps, 'offset' | 'autoPlacement'> {
	children?: Snippet;
	instance: MenuPortalInstance;

	w?: DistanceArgument;
	h?: DistanceArgument;
	maxw?: DistanceArgument;
	maxh?: DistanceArgument;
	minw?: DistanceArgument;
	minh?: DistanceArgument;
}
