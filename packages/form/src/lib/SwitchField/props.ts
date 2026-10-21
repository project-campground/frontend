import type SimpleFieldProps from '#lib/SimpleField/props.ts';
import type { SwitchProps } from '@campground/ui';

export default interface SwitchFieldProps
	extends SwitchProps, Omit<SimpleFieldProps, 'component'> {}
