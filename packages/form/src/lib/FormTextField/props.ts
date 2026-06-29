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
export default interface FormTextFieldProps extends TextInputProps {
	type?: 'text' | 'password' | 'search';

	minlength?: number;

	format?: TextFieldFormatRegex | TextFieldFormatString;

	maxrows?: number;
	known?: Snippet;
}
