import { createContext } from 'svelte';
import type { FormFieldId } from './props.ts';
import type { Writable } from 'svelte/store';

export interface FormFields {
	allValid: boolean;
	values: Record<FormFieldId, any>;
	valid: Record<FormFieldId, boolean>;
}

export interface FormContext {
	fields: Writable<FormFields>;
	addValueResetHandler: (id: FormFieldId, resetHandler: (ev?: MouseEvent) => void) => void;
	submit: (ev?: MouseEvent) => Promise<unknown>;
	updateFieldState: (id: FormFieldId, valid: boolean, value: any) => void;
}

export const [getFormContext, setFormContext] = createContext<FormContext>();
