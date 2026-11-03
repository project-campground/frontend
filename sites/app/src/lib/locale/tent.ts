import { defineMessages } from '@formatjs/svelte-intl';

export const appTentMessages = defineMessages({
	nominative: {
		id: 'app.tents.nominative',
		defaultMessage: 'tent',
		description: "Nominative case of 'tent' (equivalent to 'a tent', 'he')",
	},
	accusative: {
		id: 'app.tents.accusative',
		defaultMessage: 'the tent',
		description: "Accusative case of 'tent' (equivalent to 'the tent', 'him')",
	},
	create: { id: 'app.tents.create', defaultMessage: 'Create a tent' },
	delete: { id: 'app.tents.delete', defaultMessage: 'Delete tent' },
	settings: { id: 'app.tents.settings', defaultMessage: 'Tent settings' },
	text: { id: 'app.tents.text', defaultMessage: 'Text' },
	bulletin: { id: 'app.tents.bulletin', defaultMessage: 'Bulletin Board' },
	members: { id: 'app.tents.members', defaultMessage: 'Members' },
});
