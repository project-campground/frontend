import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface GridProps extends AriaAttributes {
	gap?: ComponentSize;
	class?: ClassValue;
	columns?: 2 | 3 | 4 | 5;
	noBreakpoint?: boolean;
	children?: Snippet;
}
