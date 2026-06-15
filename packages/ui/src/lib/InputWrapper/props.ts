import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { AriaAttributes, ClassValue, HTMLButtonAttributes } from 'svelte/elements';

export default interface InputWrapperProps extends Omit<HTMLButtonAttributes, 'size'> {
	children: Snippet;
	vertical?: boolean;
	hasError?: boolean;
	value?: string;
	size?: ComponentSize;
	disabled?: boolean | null;
	focused?: boolean | null;
	cursor?: 'pointer' | 'text';
	class?: ClassValue;
}
