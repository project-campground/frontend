import type { TextFieldFormatCombined } from './props.ts';

export function checkStringFormat(value: string, format: TextFieldFormatCombined) {
	return (format.regex && !format.regex.test(value)) ||
		(typeof format.value === 'string' && format.value !== value)
		? format.errorMessage
		: null;
}
