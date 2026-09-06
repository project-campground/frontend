import type { Snippet } from 'svelte';

export interface BlockProps {
	verticalOverflow?: boolean;
	meta?: Snippet;
	children: Snippet;
}
export interface LineProps {
	index?: number | string;
	children: Snippet;
}
