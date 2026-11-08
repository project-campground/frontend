import type { FormFieldKey } from '#lib/Form/props.js';
import type { FieldControlProps, IFormControl } from '#lib/FieldControl/index.js';
import type { ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export type DictionaryFieldValue = Record<FormFieldKey, unknown>;

export default interface DictionaryFieldProps<T = DictionaryFieldValue>
	extends
		Omit<HTMLFormAttributes, 'id'>,
		Pick<FieldControlProps<DictionaryFieldValue>, 'key' | 'required' | 'disabled'> {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;

	value?: T;
	map?: (fields: IFormControl<unknown>[]) => T;

	children: Snippet;
}
