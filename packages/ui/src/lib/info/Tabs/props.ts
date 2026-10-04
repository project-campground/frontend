import type { InFlexLayout, InGridLayout } from '$lib/hierarchy/layout.js';
import type { ComponentSizeWithNone } from '$lib/types/attributes.ts';
import type { Snippet } from 'svelte';

export interface ItemProps {
	children: Snippet;
}
export interface ListProps {
	children: Snippet;
}
export interface TabProps {
	padding?: ComponentSizeWithNone;
	children?: Snippet;
}
export interface AsyncTabProps {
	skeleton: Snippet;
	children: Snippet;
	alwaysRenderOnceSeen?: boolean;
}
export interface RootProps extends InFlexLayout, InGridLayout {
	tabs: Snippet;
	children: Snippet;
}
