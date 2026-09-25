import { defineMessages } from '@formatjs/svelte-intl';

export const numberFieldErrors = defineMessages({
	invalidFormat: {
		id: 'form.fields.number.invalidFormat',
		defaultMessage: 'Invalid number format.',
		description: 'The error when the number field has invalid value',
	},
	noFloating: {
		id: 'form.fields.number.noFloating',
		defaultMessage: 'Expected integer number.',
		description: 'The error when the number has decimal point, but integer was expected.',
	},
	greaterThanMax: {
		id: 'form.fields.number.greaterThanMax',
		defaultMessage: 'The number is greater than the maximum {value}.',
		description: 'The error when the number is greater than allowed max value.',
	},
	lessThanMin: {
		id: 'form.fields.number.greaterThanMax',
		defaultMessage: 'The number is less than the minimum {value}.',
		description: 'The error when the number is less than allowed min value.',
	},
});
