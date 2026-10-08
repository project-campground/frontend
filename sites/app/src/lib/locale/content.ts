import { defineMessages } from '@formatjs/svelte-intl';

export const appContentMessages = defineMessages({
	// Basic data
	name: { id: 'app.content.name', defaultMessage: 'Name' },
	avatar: { id: 'app.content.icon', defaultMessage: 'Icon' },
	banner: { id: 'app.content.banner', defaultMessage: 'Banner' },
	topic: { id: 'app.content.topic', defaultMessage: 'Topic' },
	tags: { id: 'app.content.tags', defaultMessage: 'Tags' },
	profile: { id: 'app.content.profile', defaultMessage: 'Profile' },

	// Who, where, when
	createdBy: { id: 'app.content.createdBy', defaultMessage: 'Created by' },
	createdAt: { id: 'app.content.createdAt', defaultMessage: 'Created at' },

	// Settings and tabs
	display: { id: 'app.content.display', defaultMessage: 'Display' },
	settings: { id: 'app.content.settings', defaultMessage: 'Settings' },

	// Actions
	create: { id: 'app.content.create', defaultMessage: 'Create', description: 'Create content' },
	edit: { id: 'app.content.edit', defaultMessage: 'Edit', description: 'Edit content' },
	amountMore: {
		id: 'app.content.amountMore',
		defaultMessage: `+{amount} more`,
		description: `Summarizes role list by only showing a few items as well as this text`,
	},
	delete: { id: 'app.content.delete', defaultMessage: 'Delete', description: 'Delete content' },
});
