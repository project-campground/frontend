import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';
import type { InFlexLayout, InGridLayout, StackableProps } from '../layout.ts';

export default interface StackProps
	extends StackableProps, AriaAttributes, InFlexLayout, InGridLayout {
	children?: Snippet;
	class?: ClassValue;
	gap?: number;
}
