import type { CheckValue } from '#lib/CheckField/props.js';
import type SimpleFieldProps from '#lib/SimpleField/props.ts';
import type { StackProps, RadioProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes, HTMLInputAttributes } from 'svelte/elements';

export interface ListProps extends StackProps {
	children?: Snippet;
}

export interface BaseItem {
	value: CheckValue;
}

export interface ItemProps
	extends AriaAttributes, Omit<RadioProps, 'value'>, Omit<SimpleFieldProps, 'component'>, BaseItem {}
export interface ButtonProps extends Omit<HTMLInputAttributes, 'value' | 'type'>, BaseItem {}
