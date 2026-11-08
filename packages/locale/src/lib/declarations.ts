import { defineMessages } from '@formatjs/svelte-intl';

export const commonLocale = defineMessages({
	download: { id: 'common.download', defaultMessage: 'Download', description: 'Download content' },
	login: {
		id: 'common.login',
		defaultMessage: 'Log in',
		description: 'Login button, login page title',
	},
});
export const siteLocale = defineMessages({
	motto: {
		id: 'site.motto',
		defaultMessage: 'Gather around the fire, friends',
		description: 'Campsite motto',
	},
	description: {
		id: 'site.desc',
		defaultMessage:
			'Campground is the best place for you and your friends to hang out, create communities, and have fun without any hassle!',
		description: 'Campsite motto subtitle',
	},
	discovery: {
		id: 'site.discovery',
		defaultMessage: 'Discovery',
		description: 'Campsite settings discovery section header',
	},
	instances: {
		id: 'site.instances',
		defaultMessage: 'Instances',
		description: 'Campground instances',
	},
	campsites: {
		id: 'site.campsites',
		defaultMessage: 'Campsites',
		description: 'Campsite list header/link',
	},
	people: { id: 'site.people', defaultMessage: 'People', description: 'People list header/link' },
	API: { id: 'site.api', defaultMessage: 'API', description: 'Campground API header' },
	docs: { id: 'site.docs', defaultMessage: 'Docs', description: 'Documents header abbreviated' },
});
// 	/////////////////////////
// 	/// Common everywhere ///
// 	/////////////////////////

// 	Copy: {
// 		id: 'common.copy',
// 		defaultMessage: 'Copy',
// 		description: 'Text of button for copying text',
// 	},

// 	// Files
// 	Upload: { id: 'common.upload', defaultMessage: 'Upload', description: 'Upload content' },

// 	// Content manipulation
// 	'common.create': { id: 'common.create', defaultMessage: 'Create', description: 'Create content' },
// 	'common.edit': { id: 'common.edit', defaultMessage: 'Edit', description: 'Edit content' },
// 	'common.delete': { id: 'common.delete', defaultMessage: 'Delete', description: 'Delete content' },
// 	'common.cancel': {
// 		id: 'common.cancel',
// 		defaultMessage: 'Cancel',
// 		description: 'Cancelling an action in settings, modals and content',
// 	},

// 	// Pages
// 	'common.continue': {
// 		id: 'common.continue',
// 		defaultMessage: 'Continue',
// 		description: 'Continue an action',
// 	},
// 	'common.skip': { id: 'common.skip', defaultMessage: 'Skip', description: 'Skip a page' },
// 	'common.next': { id: 'common.next', defaultMessage: 'Next', description: 'Next page' },
// 	'common.back': { id: 'common.back', defaultMessage: 'Back', description: 'Go back a page' },

// 	// Values
// 	'common.infinite': {
// 		id: 'common.infinite',
// 		defaultMessage: 'Infinite',
// 		description:
// 			'Infinite amount of something. Used in invite creation placeholder when assigning the amount of times invite can be used',
// 	},

// 	// In forms and info display
// 	info: {
// 		id: 'info',
// 		defaultMessage: 'Information',
// 		description: 'The title of the information section',
// 	},
// 	'info.username': {
// 		id: 'info.username',
// 		defaultMessage: 'Username',
// 		description: 'Display name of the user',
// 	},
// 	'info.avatar': {
// 		id: 'info.avatar',
// 		defaultMessage: 'Avatar',
// 		description: 'Display avatar of the user',
// 	},
// 	'info.banner': {
// 		id: 'info.banner',
// 		defaultMessage: 'Banner',
// 		description: 'Display banner of the user',
// 	},
// 	'info.pds': {
// 		id: 'info.pds',
// 		defaultMessage: 'Personal server',
// 		description: 'Longer name for PDS',
// 	},
// 	'info.appview': {
// 		id: 'info.appview',
// 		defaultMessage: 'Campsite Server',
// 		description: 'Descriptive name for appview',
// 	},
// 	'info.additionalConfig': {
// 		id: 'info.additionalConfig',
// 		defaultMessage: 'Additional settings',
// 		description: 'Additional settings/configuration section',
// 	},
// 	'info.inviteCode': {
// 		id: 'info.inviteCode',
// 		defaultMessage: 'Registration invite code',
// 		description: 'Invite code for registration',
// 	},
// 	'info.password': {
// 		id: 'info.password',
// 		defaultMessage: 'Password',
// 		description: 'Password as a login detail',
// 	},
// 	'info.password.placeholder': {
// 		id: 'info.password.placeholder',
// 		defaultMessage: 'Password here',
// 		description: 'Placeholder in the password field when registering',
// 	},
// 	'info.password.confirm': {
// 		id: 'info.password.confirm',
// 		defaultMessage: 'Re-enter password',
// 		description: 'Confirm a password when registering or changing password',
// 	},
// 	'info.handle': { id: 'info.handle', defaultMessage: 'Handle', description: 'User handles' },
// 	'info.handleOrEmail': {
// 		id: 'info.handleOrEmail',
// 		defaultMessage: 'Handle or Email',
// 		description: 'User handles or email as login detail',
// 	},
// 	'info.email': {
// 		id: 'info.email',
// 		defaultMessage: 'Email',
// 		description: 'User email as login detail',
// 	},
// 	'info.name': {
// 		id: 'info.name',
// 		defaultMessage: 'Name',
// 		description: 'The name of the content, objects, tents, etc.',
// 	},
// 	'info.title': {
// 		id: 'info.title',
// 		defaultMessage: 'Title',
// 		description: 'The title of the content, objects, tents, etc.',
// 	},
// 	'info.topic': {
// 		id: 'info.topic',
// 		defaultMessage: 'Topic',
// 		description: 'Topic header in settings and tents',
// 	},
// 	'info.about': {
// 		id: 'info.about',
// 		defaultMessage: 'About',
// 		description: 'About header in settings and tents',
// 	},
// 	'info.tagline': { id: 'info.tagline', defaultMessage: 'Tagline', description: 'User tagline' },
// 	'info.about.you': {
// 		id: 'info.about.you',
// 		defaultMessage: 'About you',
// 		description: 'About me editing section in profiles',
// 	},
// 	'info.about.me': {
// 		id: 'info.about.me',
// 		defaultMessage: 'About me',
// 		description: 'About me section in profiles',
// 	},
// 	'info.desc': {
// 		id: 'info.desc',
// 		defaultMessage: 'Description',
// 		description: 'Description in campsites, bonfires and elsewhere',
// 	},

// 	// Commonly used in forms
// 	'form.submit': {
// 		id: 'form.submit',
// 		defaultMessage: 'Submit',
// 		description: 'Submit button in forms',
// 	},
// 	'form.upload.image': {
// 		id: 'form.upload.image',
// 		defaultMessage: 'Upload image',
// 		description: 'Upload image modal header',
// 	},
// 	'form.login': {
// 		id: 'form.login',
// 		defaultMessage: 'Login',
// 		description: 'Login button and page title',
// 	},
// 	'form.logout': {
// 		id: 'form.logout',
// 		defaultMessage: 'Logout',
// 		description: 'Logout button and page title',
// 	},
// 	'form.register': {
// 		id: 'form.register',
// 		defaultMessage: 'Register',
// 		description: 'Register button and page title',
// 	},
// 	'form.confirmDelete': {
// 		id: 'form.confirmDelete',
// 		defaultMessage: 'Confirm deletion',
// 		description: 'Button for confirming deletion of content',
// 	},

// 	////////////////////
// 	/// Landing page ///
// 	////////////////////
// 	// Campground common

// 	///////////////
// 	/// Web app ///
// 	///////////////
// 	// Appearance
// 	'app.appearance.theme': {
// 		id: 'app.theme',
// 		defaultMessage: 'Theme',
// 		description: 'App theme section in the settings and Getting Started',
// 	},
// 	'app.appearance.light': {
// 		id: 'app.theme.light',
// 		defaultMessage: 'Light theme',
// 		description: 'App light theme in the settings and Getting Started',
// 	},
// 	'app.appearance.dark': {
// 		id: 'app.theme.dark',
// 		defaultMessage: 'Dark theme',
// 		description: 'App dark theme in the settings and Getting Started',
// 	},

// 	// Profiles
// 	'app.profiles.aboutMe': {
// 		id: 'app.profiles.aboutMe',
// 		defaultMessage: 'About me',
// 		description: 'About me section in the user profile',
// 	},
// 	'app.profiles.feed': {
// 		id: 'app.profiles.feed',
// 		defaultMessage: 'Feed',
// 		description: 'Feed tab in the user profile',
// 	},
// 	'app.profiles.replies': {
// 		id: 'app.profiles.replies',
// 		defaultMessage: 'Posts & Replies',
// 		description: 'Posts & Replies tab in the user profile',
// 	},

// 	'app.common.createdAt': {
// 		id: 'app.common.createdAt',
// 		defaultMessage: 'Created at',
// 		description: 'Content created when',
// 	},
// 	'app.common.joinedAt': {
// 		id: 'app.common.joinedAt',
// 		defaultMessage: 'Joined at',
// 		description: 'Member joined sometime ago',
// 	},
// 	'app.common.createdBy': {
// 		id: 'app.common.createdBy',
// 		defaultMessage: 'Created by',
// 		description: 'Content created by who',
// 	},
// 	'app.common.expiresAt': {
// 		id: 'app.common.expiresAt',
// 		defaultMessage: 'Expires',
// 		description: 'Content expires',
// 	},
// 	'app.common.edited': {
// 		id: 'app.common.edited',
// 		defaultMessage: 'Edited',
// 		description: 'Content has been edited',
// 	},
// 	// Generally just reused
// 	'app.threads': {
// 		id: 'app.threads',
// 		defaultMessage: 'Threads',
// 		description: 'Message threads tab in the right sidebar',
// 	},
// 	// Settings
// 	'app.settings.other': {
// 		id: 'app.settings.other',
// 		defaultMessage: 'Other settings',
// 		description: 'Section for deleting campsites, tents, etc.',
// 	},
// 	// Users and user settings
// 	'app.users.settings': {
// 		id: 'app.users.settings',
// 		defaultMessage: 'User settings',
// 		description: 'Header of user settings',
// 	},
// 	'app.users.settings.deactivate': {
// 		id: 'app.users.settings.deactivate',
// 		defaultMessage: 'Deactivate account',
// 		description: 'The account deactivation page in user settings',
// 	},
// 	'app.users.settings.reactivate': {
// 		id: 'app.users.settings.reactivate',
// 		defaultMessage: 'Reactivate account',
// 		description: 'The account reactivation button in user settings',
// 	},
// 	// Roles
// 	'app.roles': {
// 		id: 'app.roles',
// 		defaultMessage: 'Roles',
// 		description: 'Roles header in settings and whatnot in plural form',
// 	},
// 	'app.roles.accusativeCase': {
// 		id: 'app.roles.accusativeCase',
// 		defaultMessage: 'role',
// 		description: "Role in accusative case for role deletion: ''Delete this **role**''",
// 	},
// 	'app.roles.nominativeCase': {
// 		id: 'app.roles.nominativeCase',
// 		defaultMessage: 'role',
// 		description: "Role in nominative case for role deletion: ''The **role** is being deleted''",
// 	},
// 	// Members
// 	'app.members': {
// 		id: 'app.members',
// 		defaultMessage: 'Members',
// 		description: 'Members pseudo-tent name, members tab in the right sidebar',
// 	},
// 	'app.members.ban': {
// 		id: 'app.members.ban',
// 		defaultMessage: 'Ban member',
// 		description: 'Ban member menu item',
// 	},
// 	'app.members.kick': {
// 		id: 'app.members.kick',
// 		defaultMessage: 'Kick member',
// 		description: 'Kick member menu item',
// 	},
// 	'app.members.nickname.change': {
// 		id: 'app.members.nickname.change',
// 		defaultMessage: 'Change nickname',
// 		description: 'Members name changing modal header and menu item',
// 	},

// 	'app.bans': { id: 'app.bans', defaultMessage: 'Member bans', description: 'Member bans header' },
// 	'app.bans.reason': {
// 		id: 'app.bans.reason',
// 		defaultMessage: 'Ban reason',
// 		description: 'Reason for a member ban',
// 	},
// 	// Tents
// 	'app.tents.accusativeCase': {
// 		id: 'app.tents.accusativeCase',
// 		defaultMessage: 'tent',
// 		description: "Tent in accusative case for tent deletion: ''Delete this **tent**''",
// 	},
// 	'app.tents.nominativeCase': {
// 		id: 'app.tents.nominativeCase',
// 		defaultMessage: 'tent',
// 		description: "Tent in nominative case for tent deletion: ''The **tent** is being deleted''",
// 	},
// 	'app.tents.text': { id: 'app.tents.text', defaultMessage: 'Text', description: 'Text tent type' },
// 	'app.tents.bulletin': {
// 		id: 'app.tents.bulletin',
// 		defaultMessage: 'Bulletin Board',
// 		description: 'Bulletin Board pseudo-tent name',
// 	},
// 	'app.tents.members': {
// 		id: 'app.tents.members',
// 		defaultMessage: 'Members',
// 		description: 'Members pseudo-tent name',
// 	},
// 	'app.tents.settings': {
// 		id: 'app.tents.settings',
// 		defaultMessage: 'Tent settings',
// 		description: 'The menu button for opening tent settings and the title of tent settings',
// 	},
// 	'app.tents.create': {
// 		id: 'app.tents.create',
// 		defaultMessage: 'Create tent',
// 		description:
// 			'Create tent button at the bottom of tent list, as well as the title of tent creation modal',
// 	},
// 	'app.tents.delete': {
// 		id: 'app.tents.delete',
// 		defaultMessage: 'Delete tent',
// 		description: 'The menu button for deleting tent',
// 	},
// 	// Messages
// 	'app.messages.accusativeCase': {
// 		id: 'app.messages.accusativeCase',
// 		defaultMessage: 'message',
// 		description: "Message in accusative case for message deletion: ''Delete this **message**''",
// 	},
// 	'app.messages.nominativeCase': {
// 		id: 'app.messages.nominativeCase',
// 		defaultMessage: 'message',
// 		description:
// 			"Message in nominative case for message deletion: ''The **message** is being deleted''",
// 	},
// 	// Tent categories
// 	'app.tentCategories.settings': {
// 		id: 'app.tentCategories.settings',
// 		defaultMessage: 'Category settings',
// 		description:
// 			'The menu button for opening tent category settings and the title of category settings',
// 	},
// 	'app.tentCategories.create': {
// 		id: 'app.tentCategories.create',
// 		defaultMessage: 'Create category',
// 		description: 'The menu button for creating tent categories',
// 	},
// 	'app.tentCategories.delete': {
// 		id: 'app.tentCategories.delete',
// 		defaultMessage: 'Delete category',
// 		description: 'The menu button for deleting tent categories',
// 	},
// 	// Bonfires
// 	'app.bonfires.settings': {
// 		id: 'app.bonfires.settings',
// 		defaultMessage: 'Bonfire settings',
// 		description: 'The menu button for opening bonfire settings and the title of bonfire settings',
// 	},
// 	'app.bonfires.create': {
// 		id: 'app.bonfires.create',
// 		defaultMessage: 'Create bonfire',
// 		description: 'The menu button for creating bonfires',
// 	},
// 	'app.bonfires.delete': {
// 		id: 'app.bonfires.delete',
// 		defaultMessage: 'Delete bonfire',
// 		description: 'The menu button for deleting bonfires',
// 	},
// 	'app.bonfires.settings.name': {
// 		id: 'app.bonfires.settings.name',
// 		defaultMessage: 'Bonfire name',
// 		description: 'The header of the bonfire name field in settings',
// 	},

// 	'app.campsites.members': {
// 		id: 'app.campsites.members',
// 		defaultMessage: '{count, number} {count, plural, one { member } other { members }}',
// 		description: 'Displays the amount of members campsite has',
// 		values: { count: 0 },
// 	},
// 	'app.campsites.name': {
// 		id: 'app.campsites.name',
// 		defaultMessage: 'Campsite name',
// 		description: 'The header of the campsite name field in settings',
// 	},
// 	'app.campsites.settings': {
// 		id: 'app.campsites.settings',
// 		defaultMessage: 'Campsite settings',
// 		description: 'The menu button for opening campsite settings and the title of campsite settings',
// 	},
// 	'app.campsites.create': {
// 		id: 'app.campsites.Create',
// 		defaultMessage: 'Create a Campsite',
// 		description: 'The campsite creation page title',
// 	},
// 	'app.campsites.delete': {
// 		id: 'app.campsites.delete',
// 		defaultMessage: 'Delete campsite',
// 		description: 'The settings page for deleting campsite',
// 	},
// 	// Permissions
// 	'app.permissions.plural': {
// 		id: 'app.permissions.plural',
// 		defaultMessage: 'Permissions',
// 		description: 'Permissions in settings as plural',
// 	},

// 	'app.permissions.campsites': {
// 		id: 'app.permissions.campsites',
// 		defaultMessage: 'Campsite permissions',
// 		description: 'Header for campsite permissions in the permission list',
// 	},

// 	'app.permissions.manageCampsites': {
// 		id: 'app.permissions.manageCampsites',
// 		defaultMessage: 'Manage Campsite',
// 		description: 'Header for managing campsites permission in the permission list',
// 	},
// 	'app.permissions.manageCampsites.desc': {
// 		id: 'app.permissions.manageCampsites.desc',
// 		defaultMessage:
// 			'Allows members with this permission to edit the name of this campsite and other details.',
// 		description: "Describes what 'Manage Campsite' permission does",
// 	},

// 	'app.permissions.manageBonfires': {
// 		id: 'app.permissions.manageBonfires',
// 		defaultMessage: 'Manage Bonfires',
// 		description: 'Header for managing bonfires permission in the permission list',
// 	},
// 	'app.permissions.manageBonfires.desc': {
// 		id: 'app.permissions.manageBonfires.desc',
// 		defaultMessage: 'Allows members with this permission to edit and delete bonfires.',
// 		description: "Describes what 'Manage Bonfires' permission does",
// 	},

// 	'app.permissions.manageTents': {
// 		id: 'app.permissions.manageTents',
// 		defaultMessage: 'Manage Tents',
// 		description: 'Header for managing tents permission in the permission list',
// 	},
// 	'app.permissions.manageTents.desc': {
// 		id: 'app.permissions.manageTents.desc',
// 		defaultMessage: 'Allows members with this permission to edit and delete tents.',
// 		description: "Describes what 'Manage Tents' permission does",
// 	},

// 	'app.permissions.managePermissions': {
// 		id: 'app.permissions.managePermissions',
// 		defaultMessage: 'Manage Permissions',
// 		description: 'Header for managing permissions permission in the permission list',
// 	},
// 	'app.permissions.managePermissions.desc': {
// 		id: 'app.permissions.managePermissions.desc',
// 		defaultMessage:
// 			'Allows members with this permission to edit permissions below their highest role.',
// 		description: "Describes what 'Manage Permissions' permission does",
// 	},

// 	'app.permissions.manageRoles': {
// 		id: 'app.permissions.manageRoles',
// 		defaultMessage: 'Manage Roles',
// 		description: 'Header for managing roles permission in the permission list',
// 	},
// 	'app.permissions.manageRoles.desc': {
// 		id: 'app.permissions.manageRoles.desc',
// 		defaultMessage:
// 			'Allows members with this permission to edit and delete roles below their highest role.',
// 		description: "Describes what 'Manage Roles' permission does",
// 	},

// 	'app.permissions.giveRoles': {
// 		id: 'app.permissions.giveRoles',
// 		defaultMessage: 'Give Roles',
// 		description: 'Header for managing roles permission in the permission list',
// 	},
// 	'app.permissions.giveRoles.desc': {
// 		id: 'app.permissions.giveRoles.desc',
// 		defaultMessage:
// 			'Allows members with this permission to give and remove roles that are lower than their highest role from other members.',
// 		description: "Describes what 'Give Roles' permission does",
// 	},

// 	'app.permissions.membership': {
// 		id: 'app.permissions.membership',
// 		defaultMessage: 'Membership permissions',
// 		description: 'Header for membership permissions in the permission list',
// 	},

// 	'app.permissions.muteMembers': {
// 		id: 'app.permissions.muteMembers',
// 		defaultMessage: 'Timeout Members',
// 		description: 'Header for muting members permission in the permission list',
// 	},
// 	'app.permissions.muteMembers.desc': {
// 		id: 'app.permissions.muteMembers.desc',
// 		defaultMessage:
// 			'Allows members with this permission to disallow other members from creating content.',
// 		description: "Describes what 'Timeout Members' permission does",
// 	},

// 	'app.permissions.kickMembers': {
// 		id: 'app.permissions.kickMembers',
// 		defaultMessage: 'Kick Members',
// 		description: 'Header for muting members permission in the permission list',
// 	},
// 	'app.permissions.kickMembers.desc': {
// 		id: 'app.permissions.kickMembers.desc',
// 		defaultMessage:
// 			'Allows members with this permission to remove other members with lower rank/roles from this campsite.',
// 		description: "Describes what 'Kick Members' permission does",
// 	},

// 	'app.permissions.banMembers': {
// 		id: 'app.permissions.banMembers',
// 		defaultMessage: 'Ban Members',
// 		description: 'Header for banning members permission in the permission list',
// 	},
// 	'app.permissions.banMembers.desc': {
// 		id: 'app.permissions.banMembers.desc',
// 		defaultMessage:
// 			'Allows members with this permission to remove other members with lower rank/roles from this campsite and disallow from them joining again or allow them to join again.',
// 		description: "Describes what 'Ban Members' permission does",
// 	},

// 	'app.permissions.createInvites': {
// 		id: 'app.permissions.createInvites',
// 		defaultMessage: 'Create Invites',
// 		description: 'Header for creating invites permission in the permission list',
// 	},
// 	'app.permissions.createInvites.desc': {
// 		id: 'app.permissions.createInvites.desc',
// 		defaultMessage: 'Allows members with this permission to create invites to this campsite.',
// 		description: "Describes what 'Create Invites' permission does",
// 	},

// 	'app.permissions.manageInvites': {
// 		id: 'app.permissions.manageInvites',
// 		defaultMessage: 'Manage Invites',
// 		description: 'Header for managing invites permission in the permission list',
// 	},
// 	'app.permissions.manageInvites.desc': {
// 		id: 'app.permissions.manageInvites.desc',
// 		defaultMessage: "Allows members with this permission to delete campsite's invites.",
// 		description: "Describes what 'Managing Invites' permission does",
// 	},

// 	'app.permissions.customization': {
// 		id: 'app.permissions.customization',
// 		defaultMessage: 'Customization permissions',
// 		description: 'Header for customization permissions in the permission list',
// 	},

// 	'app.permissions.manageSelfIdentity': {
// 		id: 'app.permissions.manageSelfIdentity',
// 		defaultMessage: 'Manage Their Own Identity',
// 		description: 'Header for managing their campsite-wide profile permission in the permission list',
// 	},
// 	'app.permissions.manageSelfIdentity.desc': {
// 		id: 'app.permissions.manageSelfIdentity.desc',
// 		defaultMessage:
// 			'Allows members with this permission to change their own nickname and avatar that is only displayed in this campsite.',
// 		description: "Describes what 'Managing Their Own Identity' permission does",
// 	},

// 	'app.permissions.manageOthersIdentity': {
// 		id: 'app.permissions.manageOthersIdentity',
// 		defaultMessage: 'Manage Identity of Others',
// 		description:
// 			'Header for managing campsite-wide profile permission of other people in the permission list',
// 	},
// 	'app.permissions.manageOthersIdentity.desc': {
// 		id: 'app.permissions.manageOthersIdentity.desc',
// 		defaultMessage:
// 			'Allows members with this permission to change nickname and avatar that is only displayed in this campsite of other members.',
// 		description: "Describes what 'Managing Identity of Others' permission does",
// 	},

// 	'app.permissions.tentDivider': {
// 		id: 'app.permissions.tentDivider',
// 		defaultMessage: 'Tent only',
// 		description:
// 			'Divider in the permission list that separates tent-only permissions from campsite-wide permissions',
// 	},

// 	'app.permissions.tent': {
// 		id: 'app.permissions.tent',
// 		defaultMessage: 'Tent permissions',
// 		description: 'Header for tent permissions in the permission list',
// 	},

// 	'app.permissions.viewContent': {
// 		id: 'app.permissions.viewContent',
// 		defaultMessage: 'View Content',
// 		description: 'Header for view content permission in the permission list',
// 	},
// 	'app.permissions.viewContent.desc': {
// 		id: 'app.permissions.viewContent.desc',
// 		defaultMessage: 'Allows members to see tents in the tent list, view tents and tent messages.',
// 		description: "Describes what 'View Content' permission does",
// 	},

// 	'app.permissions.createContent': {
// 		id: 'app.permissions.createContent',
// 		defaultMessage: 'Create Content',
// 		description: 'Header for create content permission in the permission list',
// 	},
// 	'app.permissions.createContent.desc': {
// 		id: 'app.permissions.createContent.desc',
// 		defaultMessage: 'Allows members to create messages in tents.',
// 		description: "Describes what 'Create Content' permission does",
// 	},

// 	'app.permissions.pinContent': {
// 		id: 'app.permissions.pinContent',
// 		defaultMessage: 'Pin Content',
// 		description: 'Header for pin content permission in the permission list',
// 	},
// 	'app.permissions.pinContent.desc': {
// 		id: 'app.permissions.pinContent.desc',
// 		defaultMessage: 'Allows members to pin messages in tents.',
// 		description: "Describes what 'Pin Content' permission does",
// 	},

// 	'app.permissions.manageContent': {
// 		id: 'app.permissions.manageContent',
// 		defaultMessage: 'Manage Content',
// 		description: 'Header for manage content permission in the permission list',
// 	},
// 	'app.permissions.manageContent.desc': {
// 		id: 'app.permissions.manageContent.desc',
// 		defaultMessage: 'Allows members to delete messages in tents of other members.',
// 		description: "Describes what 'Manage Content' permission does",
// 	},

// 	'app.permissions.mentionEveryone': {
// 		id: 'app.permissions.mentionEveryone',
// 		defaultMessage: 'Mention @everyone and @here',
// 		description: 'Header for mention @everyone and @here permission in the permission list',
// 	},
// 	'app.permissions.mentionEveryone.desc': {
// 		id: 'app.permissions.mentionEveryone.desc',
// 		defaultMessage: 'Allows members to mention everyone.',
// 		description: "Describes what 'Mention @everyone and @here' permission does",
// 	},

// 	'app.permissions.createPrivateContent': {
// 		id: 'app.permissions.createPrivateContent',
// 		defaultMessage: 'Create Private Content',
// 		description: 'Header for create private content permission in the permission list',
// 	},
// 	'app.permissions.createPrivateContent.desc': {
// 		id: 'app.permissions.createPrivateContent.desc',
// 		defaultMessage: 'Allows members to create private messages in tents.',
// 		description: "Describes what 'Create Private Content' permission does",
// 	},

// 	// Invites
// 	'app.invites': {
// 		id: 'app.invites',
// 		defaultMessage: 'Invites',
// 		description: 'Invite menu item in campsite settings',
// 	},
// 	'app.invites.create': {
// 		id: 'app.invites.create',
// 		defaultMessage: 'Create invite',
// 		description: 'Invite creation menu item',
// 	},
// 	'app.invites.allowedAmount': {
// 		id: 'app.invites.allowedAmount',
// 		defaultMessage: 'Allowed times of use',
// 		description: 'The amount of times the invite can be used',
// 	},
// 	'app.invites.code': {
// 		id: 'app.invites.code',
// 		defaultMessage: 'Invite code',
// 		description: 'The placeholder for yet uncreated invite code or invite code in the invite list',
// 	},
// });
