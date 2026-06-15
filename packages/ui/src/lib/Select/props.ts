import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';

export default interface SelectProps extends Omit<HTMLButtonAttributes, 'size'> {
	left?: Snippet;
	right?: Snippet;
	hasError?: boolean;
	value?: string;
	size?: ComponentSize;
}
