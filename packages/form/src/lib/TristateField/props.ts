import type SimpleFieldProps from '$lib/SimpleField/props.ts';

export enum TristateValue {
	Denied = -1,
	Pass = 0,
	Allowed = 1,
}
export type RootProps = Omit<SimpleFieldProps, 'component'>;
