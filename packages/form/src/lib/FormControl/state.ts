import type { FormInstance } from '$lib/Form/context.svelte.js';
import type { FormControlInstance } from './context.svelte.ts';

export function addControlToForm(formContext: FormInstance, formControl: FormControlInstance<any>) {
	formContext.controls.push(formControl);

	// We don't want to have control exist even after it has unmounted (if it exists conditionally)
	return () => {
		const index = formContext.controls.indexOf(formControl);
		// For some odd reason form control disappeared and we don't want it to randomly cut off last element (-1 cuts off last element)
		// Future-proof
		if (index < 0) return;

		return formContext.controls.splice(index, 1);
	};
}
