import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface InputWrapperProps extends Omit<AriaAttributes, 'size'> {
	children: Snippet;
	vertical?: boolean;
	hasError?: boolean;
	value?: string;
	size?: ComponentSize;
	disabled?: boolean | null;
	focused?: boolean | null;
	class?: ClassValue;
}
