import type { TextInputProps } from '@campground/ui';
import type { Snippet } from 'svelte';

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
	minlength?: number;

	format?: TextFieldFormatRegex | TextFieldFormatString;

	maxrows?: number;
	/**
	 * For known values; this is used in registration pages for PDS and possibly in the future for tags
	 */
	known?: Snippet;
}
