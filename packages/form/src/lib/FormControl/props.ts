import type { FormFieldId } from '$lib/Form/props.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export default interface FormControlProps<T> extends AriaAttributes {
	id: FormFieldId;
	children: Snippet;

	// Value
	defaultValue?: T;
	value?: T | null;

	// Availability
	required?: boolean;
	disabled?: boolean;

	// Appearance
	flex?: number;
}
