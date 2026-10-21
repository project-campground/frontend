import type SimpleFieldProps from '$lib/SimpleField/props.ts';
import type { Pick, StackProps, SwitchProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export interface ListProps extends StackProps {
	children?: Snippet;
}

export interface SingleProps
	extends AriaAttributes, Omit<SwitchProps, 'value'>, Omit<SimpleFieldProps, 'component'> {
	value: number;
}
export interface PairedProps
	extends AriaAttributes, Omit<Pick.ListProps, 'children'>, Omit<SimpleFieldProps, 'component'> {
	position: number;
}
