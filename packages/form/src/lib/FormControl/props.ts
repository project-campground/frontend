import type { FormFieldId } from '$lib/Form/props.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export default interface FormControlProps extends AriaAttributes {
	id: FormFieldId;
	children: Snippet;

	// Value
	defaultValue?: any;
	value?: any;

	// Availability
	required?: boolean;
	disabled?: boolean;

	// Validation
	maxLength?: number;
	minLength?: number;
}
