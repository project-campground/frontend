import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLInputAttributes } from 'svelte/elements';

export default interface SelectProps extends Omit<HTMLInputAttributes, 'size'> {
	left?: Snippet;
	right?: Snippet;
	hasError?: boolean;
	value?: string;
	size?: ComponentSize;
}
