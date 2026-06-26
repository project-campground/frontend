import { createContext, useContext, type MouseEvent } from 'react';

export interface FormContext {
	get values(): Record<string | number, any>;
	get validFields(): Record<string | number, boolean>;
	get allValid(): boolean;
	onFieldChange(id: string | number, isValid: boolean, value: any): void;
	onSubmit(ev?: MouseEvent): void;
	onResetValues: (id: string | number, reset: () => unknown) => unknown;
}

export type ResetValueHandler = Parameters<FormContext['onResetValues']>[1];
export const FormContext = createContext<FormContext>(null!);
export const useForm = () => useContext(FormContext);
