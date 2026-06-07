import type { FormFieldId } from '$lib/Form/props.js';
import { createContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';

export interface FormFieldContext {
	id: Readable<FormFieldId>;
	key: string;
	state: Writable<{ error: string | null; value: any }>;
	error: Writable<string | null>;
	required: Readable<boolean>;
	disabled: Readable<boolean>;
}
export const [getFormFieldContext, setFormFieldContext] = createContext<FormFieldContext>();
