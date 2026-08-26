import type { FormCheckValue } from '$lib/FormCheck/props.js';
import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';
import type { StackProps, RadioProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes, HTMLInputAttributes } from 'svelte/elements';

export interface FormRadioListProps extends StackProps {
	children?: Snippet;
}

export interface FormRadioBaseItem {
	value: FormCheckValue;
}

export interface FormRadioItemProps
	extends
		AriaAttributes,
		Omit<RadioProps, 'value'>,
		Omit<FormSimpleFieldProps, 'component'>,
		FormRadioBaseItem {}
export interface FormRadioButtonProps
	extends Omit<HTMLInputAttributes, 'value' | 'type'>, FormRadioBaseItem {}
