import { defineMessages } from '@formatjs/svelte-intl';

export const appContentMessages = defineMessages({
	name: { id: 'app.content.name', defaultMessage: 'Name' },
	avatar: { id: 'app.content.icon', defaultMessage: 'Icon' },
	banner: { id: 'app.content.banner', defaultMessage: 'Banner' },
	topic: { id: 'app.content.topic', defaultMessage: 'Topic' },
	profile: { id: 'app.content.profile', defaultMessage: 'Profile' },

	appearance: { id: 'app.content.appearance', defaultMessage: 'Appearance' },
	settings: { id: 'app.content.settings', defaultMessage: 'Settings' },

	create: { id: 'app.content.create', defaultMessage: 'Create', description: 'Create content' },
	edit: { id: 'app.content.edit', defaultMessage: 'Edit', description: 'Edit content' },
	amountMore: {
		id: 'app.content.amountMore',
		defaultMessage: `+{amount} more`,
		description: `Summarizes role list by only showing a few items as well as this text`,
	},
	delete: { id: 'app.content.delete', defaultMessage: 'Delete', description: 'Delete content' },
});
