import type { ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';
import type { FormFields } from './context.ts';

export type FormFieldId = string | number;
export default interface FormProps extends AriaAttributes {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;
	children: Snippet;

	fields?: FormFields;
	onSubmit?: (values: Record<FormFieldId, any>, ev?: MouseEvent | undefined) => Promise<unknown>;
}
