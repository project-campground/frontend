import type { InFlexLayout, InGridLayout } from '$lib/hierarchy/layout.js';
import type { ComponentSizeWithNone } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';

export interface ItemProps {
	children: Snippet;
}
export interface ListProps {
	children: Snippet;
}
export interface TabProps {
	element?: HTMLDivElement;
	padding?: ComponentSizeWithNone;
	noInlinePadding?: boolean;
	children?: Snippet;
}
export interface AsyncTabProps extends Omit<TabProps, 'element'> {
	skeleton: Snippet;
	children: Snippet;
	alwaysRenderOnceSeen?: boolean;
}
export interface RootProps extends InFlexLayout, InGridLayout {
	tabs: Snippet;
	children: Snippet;
}
