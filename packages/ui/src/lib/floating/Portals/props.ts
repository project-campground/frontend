import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export interface ListProps extends AriaAttributes {
	class?: ClassValue;
	children: Snippet;
}
export interface RootProps extends AriaAttributes {
	class?: ClassValue;
	flex?: boolean;
	fullSize?: boolean;
	children: Snippet;
}
