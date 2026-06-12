import type { FormCheckValue } from '$lib/FormCheck/context.js';
import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';
import type { SwitchProps, StackProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export interface FormRadioListProps extends StackProps {
	children?: Snippet;
}

export interface FormRadioItemProps
	extends AriaAttributes, Omit<SwitchProps, 'value'>, Omit<FormSimpleFieldProps, 'component'> {
	value: FormCheckValue;
}
