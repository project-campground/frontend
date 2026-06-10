import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';
import type { SwitchProps } from '@campground/ui';
import type { AriaAttributes } from 'svelte/elements';

export default interface FormSwitchProps
	extends AriaAttributes, SwitchProps, Omit<FormSimpleFieldProps, 'component'> {}
