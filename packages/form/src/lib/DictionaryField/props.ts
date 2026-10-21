import type { FormFieldId } from '#lib/Form/props.js';
import type { FieldControlProps, IFormControl } from '#lib/FieldControl/index.ts';
import type { ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export type DictionaryFieldValue = Record<FormFieldId, unknown>;

export default interface DictionaryFieldProps<T = DictionaryFieldValue>
	extends
		Omit<HTMLFormAttributes, 'id'>,
		Pick<FieldControlProps<DictionaryFieldValue>, 'id' | 'required' | 'disabled'> {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;

	value?: T;
	map?: (fields: IFormControl<unknown>[]) => T;

	children: Snippet;
}
