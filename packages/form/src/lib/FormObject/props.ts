import type { FormFieldId } from '$lib/Form/props.js';
import type { FormControlProps } from '$lib/FormControl/index.js';
import type { ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export type FormObjectValue = Record<FormFieldId, unknown>;

export default interface FormObjectProps
	extends
		Omit<HTMLFormAttributes, 'id'>,
		Pick<FormControlProps<FormObjectValue>, 'id' | 'required' | 'disabled'> {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;

	value?: FormObjectValue;

	children: Snippet;
}
