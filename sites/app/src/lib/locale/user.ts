import { defineMessages } from '@formatjs/svelte-intl';

export const appUsersMessages = defineMessages({
	name: { id: 'app.users.name', defaultMessage: 'Username' },
	avatar: { id: 'app.users.avatar', defaultMessage: 'Profile avatar' },
	banner: { id: 'app.users.banner', defaultMessage: 'Profile banner' },
	pds: { id: 'app.users.pds', defaultMessage: 'Personal Data Server' },
	inviteCode: { id: 'app.users.inviteCode', defaultMessage: 'User invite code' },
	handle: { id: 'app.users.handle', defaultMessage: 'Handle' },
	email: { id: 'app.users.email', defaultMessage: 'Email' },
	handleOrEmail: { id: 'app.users.handleOrEmail', defaultMessage: 'Handle or Email' },
	tagline: { id: 'app.users.tagline', defaultMessage: 'Tag line' },
	about: { id: 'app.users.about', defaultMessage: 'About me' },
	aboutYou: { id: 'app.users.aboutYou', defaultMessage: 'About you' },
});
