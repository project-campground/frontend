import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface StackProps extends AriaAttributes {
	children?: Snippet;
	class?: ClassValue;
	direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
	directionMobile?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
	gap?: number;
}
