import type { Snippet } from 'svelte';

export interface BlockProps {
	verticalOverflow?: boolean;
	meta?: Snippet;
	containerElement?: HTMLElementTagNameMap['div'];
	codeElement?: HTMLElementTagNameMap['code'];
	children?: Snippet;
}
export interface LineProps {
	element?: HTMLElementTagNameMap['span'];
	index?: number | string;
	children?: Snippet;
}
