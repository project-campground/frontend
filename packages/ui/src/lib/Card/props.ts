import type { Snippet } from 'svelte';
import type { ComponentSize } from "../../types/attributes.ts";

export interface RootProps {
	size?: ComponentSize;
	children: Snippet;
}
export interface ContentProps {
	children: Snippet;
}
export interface OverflowProps {
	children: Snippet;
}
