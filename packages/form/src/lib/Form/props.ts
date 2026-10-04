import type { ComponentSize, InFlexLayout, InGridLayout } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export type FormFieldId = string | number;
export default interface FormProps extends HTMLFormAttributes, InFlexLayout, InGridLayout {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;
	h?: 'full';

	children: Snippet;
	onSubmit?: (
		values: Record<FormFieldId, any>,
		ev?: MouseEvent | undefined,
	) => Promise<unknown> | unknown;
}
