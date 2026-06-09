import type { TextInputProps } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes, HTMLInputAttributes } from 'svelte/elements';

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
export default interface FormTextFieldProps extends AriaAttributes {
	type?: 'text' | 'password' | 'search';

	multipleRows?: boolean;
	minLength?: number;
	maxLength?: number;
	rows?: number;

	format?: TextFieldFormatRegex | TextFieldFormatString;

	top?: Snippet;
	left?: Snippet;
	bottom?: Snippet;
	right?: Snippet;

	maxRows?: number;
}
