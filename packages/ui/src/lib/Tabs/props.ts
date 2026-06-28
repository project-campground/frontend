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
export interface RootProps {
	tabs: Snippet;
	children: Snippet;
}
