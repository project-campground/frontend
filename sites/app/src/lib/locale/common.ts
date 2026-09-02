import { defineMessages } from '@formatjs/svelte-intl';

export const appCommonMessages = defineMessages({
	copy: {
		id: 'app.common.copy',
		defaultMessage: 'Copy',
		description: 'Text of button for copying text',
	},

	// Content manipulation
	cancel: {
		id: 'app.common.cancel',
		defaultMessage: 'Cancel',
		description: 'Cancelling an action in settings, modals and content',
	},

	// Pages
	continue: {
		id: 'app.common.continue',
		defaultMessage: 'Continue',
		description: 'Continue an action',
	},
	skip: { id: 'app.common.skip', defaultMessage: 'Skip', description: 'Skip a page' },
	next: { id: 'app.common.next', defaultMessage: 'Next', description: 'Next page' },
	back: { id: 'app.common.back', defaultMessage: 'Back', description: 'Go back a page' },

	// Values
	infinite: {
		id: 'app.common.infinite',
		defaultMessage: 'Infinite',
		description:
			'Infinite amount of something. Used in invite creation placeholder when assigning the amount of times invite can be used',
	},
});
