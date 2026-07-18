import type { FormFieldId } from '$lib/Form/props.js';
import type { FormControlProps } from '$lib/FormControl/index.js';
import type { ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export default interface FormObjectProps
	extends Omit<HTMLFormAttributes, 'id'>, Pick<FormControlProps, 'id' | 'required' | 'disabled'> {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;

	value?: Record<FormFieldId, any>;

	children: Snippet;
	onSubmit?: (values: Record<FormFieldId, any>, ev?: MouseEvent | undefined) => Promise<unknown>;
}
