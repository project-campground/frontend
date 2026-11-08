import type { FormFieldKey } from '#lib/Form/props.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export default interface FieldControlProps<T> extends AriaAttributes {
	key: FormFieldKey;
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
