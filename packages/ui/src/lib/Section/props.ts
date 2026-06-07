import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface StackProps extends AriaAttributes {
	header?: Snippet;
	subtle?: boolean;
	headerLevel?: 1 | 2 | 3 | 4 | 5 | 6;
	children?: Snippet;
	class?: ClassValue;
	gap?: ComponentSize;
}
