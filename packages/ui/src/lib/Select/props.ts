import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type SelectValue = string | number | boolean;

export default interface SelectProps extends Omit<
	HTMLButtonAttributes,
	'size' | 'placeholder' | 'value'
> {
	left?: Snippet;
	right?: Snippet;
	value?: SelectValue | null;
	size?: ComponentSize;

	children: Snippet;
	display: Snippet<[SelectValue | undefined | null]>;
}
