import type SimpleFieldProps from '#lib/SimpleField/props.ts';
import type { StackProps, SwitchProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export type CheckValue = string | number;

export interface ListProps extends StackProps {
	children?: Snippet;
}

export interface ItemProps
	extends AriaAttributes, Omit<SwitchProps, 'value'>, Omit<SimpleFieldProps, 'component'> {
	value: CheckValue;
}
