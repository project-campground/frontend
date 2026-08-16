import type { Snippet } from 'svelte';

export interface ItemProps {
	children: Snippet;
}
export interface ListProps {
	children: Snippet;
}
export interface TabProps {
	children?: Snippet;
}
export interface AsyncTabProps {
	skeleton: Snippet;
	children: Snippet;
	alwaysRenderOnceSeen?: boolean;
}
export interface RootProps {
	tabs: Snippet;
	children: Snippet;
}
