import type FormSimpleFieldProps from '$lib/FormSimpleField/props.ts';

export enum TristateValue {
	Denied = -1,
	Pass = 0,
	Allowed = 1,
}
export type RootProps = Omit<FormSimpleFieldProps, 'component'>;
