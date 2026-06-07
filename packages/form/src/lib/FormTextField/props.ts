import type { TextInputProps } from '@campground/ui';

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
export default interface FormTextFieldProps extends Omit<
	TextInputProps,
	'id' | 'maxlength' | 'minlength'
> {
	minLength?: number;
	maxLength?: number;
	format?: TextFieldFormatRegex | TextFieldFormatString;
}
