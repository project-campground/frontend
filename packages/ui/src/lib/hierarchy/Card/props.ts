import type { Snippet } from 'svelte';
import type { ComponentSize } from '../../types/attributes.ts';
import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';
import type { DistanceArgument } from '$lib/util/component.js';
import type { InFlexLayout, InGridLayout, StackableProps } from '../layout.ts';

export interface RootProps extends StackableProps, InGridLayout, InFlexLayout {
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	children: Snippet;
	overflow?: 'auto' | 'visible';
}
export interface ContentProps extends StackableProps {
	gap?: ComponentSize;
	class?: ClassValue;
	children: Snippet;
	pt?: DistanceArgument;
	pb?: DistanceArgument;
	pl?: DistanceArgument;
	pr?: DistanceArgument;
}
export interface OverflowProps extends StackableProps {
	mb?: DistanceArgument;
	mt?: DistanceArgument;
	class?: ClassValue;
	children: Snippet;
}
export interface ClickProps extends HTMLAnchorAttributes {
	class?: ClassValue;
}
