import type { FormControlProps } from '$lib/FormControl/index.js';
import type { Card, ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export interface RootProps<T>
	extends
		Omit<HTMLFormAttributes, 'id'>,
		Pick<FormControlProps<T[]>, 'id' | 'required' | 'disabled' | 'defaultValue'> {
	class?: ClassValue;
	gap?: ComponentSize;

	max?: number;
	value?: T[];

	defaultItemValue?: T;

	children: Snippet;
}
export interface ListProps {
	children: Snippet;
}
export interface ItemProps<T> extends Pick<Card.RootProps, 'level' | 'size'> {
	id: number;

	value: T;

	children: Snippet;
}
