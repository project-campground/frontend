import { defineMessages } from '@formatjs/svelte-intl';

export const appRolesMessages = defineMessages({
	roles: { id: 'app.roles', defaultMessage: 'Roles' },
	motion: {
		id: 'app.roles.motion',
		defaultMessage: 'Role Animation',
		description: 'The animation of the role colour gradient',
	},
	delete: { id: 'app.roles.delete', defaultMessage: 'Delete role' },
});
