import type { FormCheckValue } from '$lib/FormCheck/context.js';
import { createContext } from 'svelte';
import type { Writable } from 'svelte/store';

export interface FormRadioContext {
	key: string;
	value: Writable<FormCheckValue | null>;
}

export const [getFormRadioContext, setFormRadioContext] = createContext<FormRadioContext>();
