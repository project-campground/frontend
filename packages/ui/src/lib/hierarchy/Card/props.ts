import type { Snippet } from 'svelte';
import type { ComponentSize } from '../../types/attributes.ts';
import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';
import type { DistanceArgument } from '$lib/util/component.js';

export interface RootProps {
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	children: Snippet;
	overflow?: 'auto' | 'visible';
}
export interface ContentProps {
	gap?: ComponentSize;
	class?: ClassValue;
	orientation?: 'vertical' | 'horizontal';
	children: Snippet;
	pt?: DistanceArgument;
	pb?: DistanceArgument;
	pl?: DistanceArgument;
	pr?: DistanceArgument;
}
export interface OverflowProps {
	mb?: DistanceArgument;
	mt?: DistanceArgument;
	class?: ClassValue;
	children: Snippet;
}
export interface ClickProps extends HTMLAnchorAttributes {
	class?: ClassValue;
}
