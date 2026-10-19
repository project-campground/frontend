import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';
import type { Pick, StackProps, SwitchProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export interface ListProps extends StackProps {
	children?: Snippet;
}

export interface SingleProps
	extends AriaAttributes, Omit<SwitchProps, 'value'>, Omit<FormSimpleFieldProps, 'component'> {
	value: number;
}
export interface PairedProps
	extends AriaAttributes, Omit<Pick.ListProps, 'children'>, Omit<FormSimpleFieldProps, 'component'> {
	position: number;
}
