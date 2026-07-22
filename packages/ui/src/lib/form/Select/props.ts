import type { Snippet } from 'svelte';
import type { ComponentSize } from '../../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ItemProps } from '$lib/floating/Menu/props.js';
import type { Menu } from '$lib/index.js';

export type SelectValue = string | number | boolean;

export interface MenuProps extends Menu.RootProps {
	onSelect: (newValue: SelectValue) => unknown;

	children: Snippet;
}
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'size' | 'placeholder' | 'value'> {
	left?: Snippet;
	right?: Snippet;
	value?: SelectValue | null;
	size?: ComponentSize;

	children: Snippet;
	display: Snippet<[SelectValue | undefined | null]>;
}
export interface OptionProps extends Omit<Menu.ButtonProps, 'onclick' | 'value'> {
	value: SelectValue;
}
