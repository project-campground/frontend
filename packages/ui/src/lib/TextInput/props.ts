import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { AriaAttributes, HTMLInputAttributes } from 'svelte/elements';

export default interface TextInputProps
	extends
		AriaAttributes,
		Pick<HTMLInputAttributes, 'tabindex' | 'disabled' | 'class' | 'maxlength' | 'placeholder'> {
	top?: Snippet;
	bottom?: Snippet;
	left?: Snippet;
	right?: Snippet;

	// Value
	value?: string;
	error?: boolean;

	multirow?: boolean;
	maxrows?: number;

	// Appearance
	rows?: number;
	size?: ComponentSize;
}
