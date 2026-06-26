import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { MenuItemProps } from '$lib/Menu/props.js';

export type SelectValue = string | number | boolean;

export interface ButtonProps extends Omit<HTMLButtonAttributes, 'size' | 'placeholder' | 'value'> {
	left?: Snippet;
	right?: Snippet;
	value?: SelectValue | null;
	size?: ComponentSize;

	children: Snippet;
	display: Snippet<[SelectValue | undefined | null]>;
}
export interface OptionProps extends Omit<MenuItemProps, 'onclick'> {
	value: SelectValue | null;
}
