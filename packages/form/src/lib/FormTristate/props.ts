import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';

export enum TristateValue {
	Denied = -1,
	Pass = 0,
	Allowed = 1,
}
export interface RootProps extends Omit<FormSimpleFieldProps, 'component'> {}
