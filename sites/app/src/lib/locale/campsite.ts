import { defineMessages } from '@formatjs/svelte-intl';

export const appCampsiteMessages = defineMessages({
	create: { id: 'app.campsites.create', defaultMessage: 'Create a Campsite' },
	delete: { id: 'app.campsites.delete', defaultMessage: 'Delete campsite' },
	settings: { id: 'app.campsites.settings', defaultMessage: 'Campsite settings' },
	members: {
		id: 'app.campsites.members',
		defaultMessage: '{count, number} {count, plural, one { member } other { members } }',
		value: { count: 0 },
	},
});
