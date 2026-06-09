import type { SwitchProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export interface TextFieldFormatBase {
	errorMessage: string;
}
export interface TextFieldFormatRegex extends TextFieldFormatBase {
	regex?: RegExp;
}
export interface TextFieldFormatString extends TextFieldFormatBase {
	value?: string;
}
export type TextFieldFormatCombined = TextFieldFormatRegex & TextFieldFormatString;
export default interface FormTextFieldProps extends AriaAttributes, SwitchProps {
	header?: Snippet;
	children?: Snippet;
}
