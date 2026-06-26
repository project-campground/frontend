import { defineMessages } from '@formatjs/svelte-intl';
import type { TextFieldFormatCombined } from './props.ts';

export function checkStringFormat(value: string, format: TextFieldFormatCombined) {
	return (
			(format.regex && !format.regex.test(value))
				|| (typeof format.value === 'string' && format.value !== value)
		) ?
			format.errorMessage
		:	null;
}
export const textFieldErrors = defineMessages({
	minLength: {
		id: 'form.fields.text.maxLength',
		defaultMessage: 'The text is too short. Expected text to be {length} characters or more.',
		description: 'The error when the text field has value that is too long',
	},
});
