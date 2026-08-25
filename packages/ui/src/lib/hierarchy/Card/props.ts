import type { Snippet } from 'svelte';
import type { ComponentSize, FlexDirection } from '../../types/attributes.ts';
import type { ClassValue, HTMLAnchorAttributes } from 'svelte/elements';
import type { DistanceArgument } from '$lib/util/component.js';
import type StackProps from '../Stack/props.ts';
import type { InFlexLayout, InGridLayout } from '../layout.ts';

export interface RootProps extends Pick<StackProps, 'direction'>, InGridLayout, InFlexLayout {
	direction?: FlexDirection;
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	children: Snippet;
	overflow?: 'auto' | 'visible';
}
export interface ContentProps extends Pick<StackProps, 'direction'> {
	direction?: FlexDirection;
	gap?: ComponentSize;
	class?: ClassValue;
	children: Snippet;
	pt?: DistanceArgument;
	pb?: DistanceArgument;
	pl?: DistanceArgument;
	pr?: DistanceArgument;
}
export interface OverflowProps extends Pick<StackProps, 'direction'> {
	mb?: DistanceArgument;
	mt?: DistanceArgument;
	class?: ClassValue;
	children: Snippet;
}
export interface ClickProps extends HTMLAnchorAttributes {
	class?: ClassValue;
}
