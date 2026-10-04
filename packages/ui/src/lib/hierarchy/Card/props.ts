import type { Snippet } from 'svelte';
import type { ComponentSize, ComponentSizeWithNone } from '../../types/attributes.ts';
import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';
import type { Size } from '$lib/util/component.js';
import type { InFlexLayout, InGridLayout, StackedProps } from '../layout.ts';

export interface RootProps extends StackedProps, InGridLayout, InFlexLayout {
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	gap?: Size;
	padding?: ComponentSizeWithNone;
	children: Snippet;
	overflow?: 'auto' | 'visible' | 'hidden';
}
export interface LayoutItemProps extends StackedProps, InFlexLayout {
	pt?: Size;
	pb?: Size;
	pl?: Size;
	pr?: Size;

	mb?: Size;
	mt?: Size;

	gap?: ComponentSize;
	class?: ClassValue;

	overflow?: 'auto' | 'visible' | 'hidden';
	children: Snippet;
}
export type ContentProps = LayoutItemProps;
export type OverflowProps = LayoutItemProps;
export interface ClickProps extends HTMLAnchorAttributes {
	class?: ClassValue;
}
