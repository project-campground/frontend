import type { Snippet } from 'svelte';
import type { ComponentSize } from '../../types/attributes.ts';
import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';
import type { Size } from '$lib/util/component.js';
import type { InFlexLayout, InGridLayout, StackedProps } from '../layout.ts';

export interface RootProps extends StackedProps, InGridLayout, InFlexLayout {
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	gap?: Size;
	children: Snippet;
	overflow?: 'auto' | 'visible';
}
export interface LayoutItemProps extends StackedProps, InFlexLayout {
	pt?: Size;
	pb?: Size;
	pl?: Size;
	pr?: Size;

	mb?: Size;
	mt?: Size;

	h?: 'full';

	gap?: ComponentSize;
	class?: ClassValue;
}
export interface ContentProps extends LayoutItemProps {
	children: Snippet;
}
export interface OverflowProps extends LayoutItemProps {
	children: Snippet;
}
export interface ClickProps extends HTMLAnchorAttributes {
	class?: ClassValue;
}
