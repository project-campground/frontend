import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends HTMLAttributes<HTMLElementTagNameMap['section']> {
	size?: ComponentSize;
	height?: 'full';
	columns?: number[];
	children: Snippet;
}
export interface HeaderProps extends HTMLAttributes<HTMLElementTagNameMap['header']> {
	sticky?: boolean;
	children: Snippet;
}
export interface RowProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	children: Snippet;
}
export interface CellProps extends HTMLAttributes<HTMLElementTagNameMap['span']> {
	children: Snippet;
}
export interface BodyProps extends HTMLAttributes<HTMLElementTagNameMap['section']> {
	overflow?: boolean;
	children: Snippet;
}
export interface FooterProps extends HTMLAttributes<HTMLElementTagNameMap['footer']> {
	sticky?: boolean;
	children: Snippet;
}
