import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';
import type { StackProps, SwitchProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';
import type { FormCheckValue } from './context.ts';

export interface FormChecklistProps extends StackProps {
	children?: Snippet;
}

export interface FormCheckboxProps
	extends AriaAttributes, Omit<SwitchProps, 'value'>, Omit<FormSimpleFieldProps, 'component'> {
	value: FormCheckValue;
}
