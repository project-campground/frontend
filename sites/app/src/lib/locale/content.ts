import { defineMessages } from '@formatjs/svelte-intl';

export const appContentMessages = defineMessages({
	name: { id: 'app.content.name', defaultMessage: 'Name' },
	avatar: { id: 'app.content.icon', defaultMessage: 'Icon' },
	banner: { id: 'app.content.banner', defaultMessage: 'Banner' },
	topic: { id: 'app.content.topic', defaultMessage: 'Topic' },

	create: { id: 'app.content.create', defaultMessage: 'Create', description: 'Create content' },
	edit: { id: 'app.content.edit', defaultMessage: 'Edit', description: 'Edit content' },
	delete: { id: 'app.content.delete', defaultMessage: 'Delete', description: 'Delete content' },
});
