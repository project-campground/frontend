import { defineMessages } from '@formatjs/svelte-intl';

export const appPasswordMessages = defineMessages({
	password: { id: 'app.passwords', defaultMessage: 'Password' },
	placeholder: { id: 'app.passwords.placeholder', defaultMessage: 'password_here' },
	confirmPassword: { id: 'app.passwords.confirm', defaultMessage: 'Re-enter Password' },
});
