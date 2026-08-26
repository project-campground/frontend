import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';
import type { SwitchProps } from '@campground/ui';

export default interface FormSwitchProps
	extends SwitchProps, Omit<FormSimpleFieldProps, 'component'> {}
