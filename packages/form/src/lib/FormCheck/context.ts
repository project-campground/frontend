import { createContext } from 'svelte';
import type { SvelteSet } from 'svelte/reactivity';

export type FormCheckValue = string | number;
export interface FormChecksContext {
	checked: SvelteSet<FormCheckValue>;
}

export const [getFormChecksContext, setFormChecksContext] = createContext<FormChecksContext>();
