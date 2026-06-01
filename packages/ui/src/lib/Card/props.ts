import type { Snippet } from 'svelte';
import type { ComponentSize } from "../types/attributes.ts";
import type { ClassValue } from "svelte/elements";

export interface RootProps {
	level?: 'default' | 'subtle';
	class?: ClassValue;
	size?: ComponentSize | 'xxl';
	children: Snippet;
}
export interface ContentProps {
	class?: ClassValue;
	children: Snippet;
}
export interface OverflowProps {
	class?: ClassValue;
	children: Snippet;
}
