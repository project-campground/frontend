import type { ComponentSize } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { ClassValue, HTMLFormAttributes } from 'svelte/elements';

export type FormFieldId = string | number;
export default interface FormProps extends HTMLFormAttributes {
	inlineContent?: boolean;
	hideOverflow?: boolean;
	class?: ClassValue;
	gap?: ComponentSize;
	flex?: number;
	h?: 'full';

	children: Snippet;
	onSubmit?: (
		values: Record<FormFieldId, any>,
		ev?: MouseEvent | undefined,
	) => Promise<unknown> | unknown;
}
