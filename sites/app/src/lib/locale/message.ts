import { defineMessages } from '@formatjs/svelte-intl';

export const appMessageMessages = defineMessages({
	edited: { id: 'app.messages.edited', defaultMessage: 'edited' },
	edit: { id: 'app.messages.edit', defaultMessage: 'Edit message' },
	delete: { id: 'app.messages.delete', defaultMessage: 'Delete message' },
	addReply: { id: 'app.messages.reply.add', defaultMessage: 'Reply to message' },
	removeReply: { id: 'app.messages.reply.remove', defaultMessage: 'Remove reply to message' },
});
