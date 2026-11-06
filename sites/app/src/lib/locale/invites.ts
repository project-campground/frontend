import { defineMessages } from '@formatjs/svelte-intl';

export const appInvitesMessages = defineMessages({
	invites: { id: 'app.invites', defaultMessage: 'Invites' },
	create: { id: 'app.invites.create', defaultMessage: 'Create an invite' },
	allowedAmount: {
		id: 'app.invites.allowedAmount',
		defaultMessage: 'Allowed uses',
		description: `The allowed amount that invite can be used`,
	},
	expiresAt: { id: 'app.invites.expiresAt', defaultMessage: 'Expires at' },
});
