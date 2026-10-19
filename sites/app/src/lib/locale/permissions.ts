import { defineMessage, defineMessages } from '@formatjs/svelte-intl';

export const appPermissionsMessages = {
	permissions: defineMessage({ id: 'app.permission', defaultMessage: 'Permissions' }),
	management: defineMessage({
		id: 'app.permission.management',
		defaultMessage: 'Management permissions',
	}),
	membership: defineMessage({
		id: 'app.permission.membership',
		defaultMessage: 'Membership permissions',
	}),
	customization: defineMessage({
		id: 'app.permission.customization',
		defaultMessage: 'Customization permissions',
	}),
	content: defineMessage({ id: 'app.permission.content', defaultMessage: 'Content permissions' }),
	// General permissions
	manageCampsite: defineMessages({
		title: { id: 'app.permission.manageCampsite', defaultMessage: 'Manage Campsite' },
		description: {
			id: 'app.permission.manageCampsite.desc',
			defaultMessage: 'Allows editing the profile of the campsite',
		},
	}),
	manageBonfires: defineMessages({
		title: { id: 'app.permission.manageBonfires', defaultMessage: 'Manage Bonfires' },
		description: {
			id: 'app.permission.manageBonfires.desc',
			defaultMessage: 'Allows creating, editing and deleting the bonfires',
		},
	}),
	manageTents: defineMessages({
		title: { id: 'app.permission.manageTents', defaultMessage: 'Manage Tents' },
		description: {
			id: 'app.permission.manageTents.desc',
			defaultMessage: 'Allows creating, editing, moving and deleting the tents',
		},
	}),
	manageRoles: defineMessages({
		title: { id: 'app.permission.manageRoles', defaultMessage: 'Manage Roles' },
		description: {
			id: 'app.permission.manageRoles.desc',
			defaultMessage:
				'Allows creating, editing, moving and deleting the roles. This also allows changing permissions on tents.',
		},
	}),
	giveRoles: defineMessages({
		title: { id: 'app.permission.giveRoles', defaultMessage: 'Give Roles' },
		description: {
			id: 'app.permission.giveRoles.desc',
			defaultMessage:
				"Allows member adding and removing roles from other members. Member can also give and remove roles from themselves, no matter what the permissions of the role are. Member cannot give or remove role that is their highest role or roles that are higher than member''s highest role.",
		},
	}),
	muteMembers: defineMessages({
		title: { id: 'app.permission.muteMembers', defaultMessage: 'Mute Members' },
		description: {
			id: 'app.permission.muteMembers.desc',
			defaultMessage:
				'Allows user muting other members and preventing them from talking or creating content',
		},
	}),
	kickMembers: defineMessages({
		title: { id: 'app.permission.kickMembers', defaultMessage: 'Kick Members' },
		description: {
			id: 'app.permission.kickMembers.desc',
			defaultMessage:
				'Allows member removing users from the campsite. Members that are higher or in the same height in the role list than the the member with this permission cannot be kicked by that member.',
		},
	}),
	banMembers: defineMessages({
		title: { id: 'app.permission.banMembers', defaultMessage: 'Ban & Pardon Members' },
		description: {
			id: 'app.permission.banMembers.desc',
			defaultMessage:
				'Allows member banning other members or removing bans from users. Members with this permission cannot ban members that are in the same height or higher in the role list',
		},
	}),
	manageSelfIdentity: defineMessages({
		title: {
			id: 'app.permission.manageSelfIdentity',
			defaultMessage: 'Change Their Own Local Profile',
		},
		description: {
			id: 'app.permission.manageSelfIdentity.desc',
			defaultMessage: 'Allows member to change how they profile looks for this specific campsite.',
		},
	}),
	manageOthersIdentity: defineMessages({
		title: {
			id: 'app.permission.manageOthersIdentity',
			defaultMessage: 'Change Local Profile of Others',
		},
		description: {
			id: 'app.permission.manageOthersIdentity.desc',
			defaultMessage:
				"Allows member to change how profile of other member''s look in this campsite. They cannot change things like avatars of members.",
		},
	}),
	createInvites: defineMessages({
		title: { id: 'app.permission.createInvites', defaultMessage: 'Create Invites' },
		description: {
			id: 'app.permission.createInvites.desc',
			defaultMessage: 'Allows member to create invites to this campsite.',
		},
	}),
	manageInvites: defineMessages({
		title: { id: 'app.permission.manageInvites', defaultMessage: 'Manage Invites' },
		description: {
			id: 'app.permission.manageInvites.desc',
			defaultMessage: 'Allows member to delete invites to this campsite.',
		},
	}),
	// Content permissions
	viewContent: defineMessages({
		title: { id: 'app.permission.viewContent', defaultMessage: 'View Content' },
		description: {
			id: 'app.permission.viewContent.desc',
			defaultMessage: 'Allows member to see tents and view content in the tents.',
		},
	}),
	createContent: defineMessages({
		title: { id: 'app.permission.createContent', defaultMessage: 'Create Content' },
		description: {
			id: 'app.permission.viewContent.desc',
			defaultMessage:
				'Allows member to create messages & content and edit or delete their own content.',
		},
	}),
	labelContent: defineMessages({
		title: { id: 'app.permission.labelContent', defaultMessage: 'Pin Content' },
		description: {
			id: 'app.permission.labelContent.desc',
			defaultMessage: 'Allows members to pin content.',
		},
	}),
	manageContent: defineMessages({
		title: { id: 'app.permission.manageContent', defaultMessage: 'Manage Content' },
		description: {
			id: 'app.permission.manageContent.desc',
			defaultMessage: 'Allows members to delete content of other members.',
		},
	}),
	mentionMany: defineMessages({
		title: { id: 'app.permission.mentionMany', defaultMessage: 'Mention @everyone' },
		description: {
			id: 'app.permission.mentionMany.desc',
			defaultMessage: 'Allows members to ping all members.',
		},
	}),
	createPrivateContent: defineMessages({
		title: { id: 'app.permission.createPrivateContent', defaultMessage: 'Create Private Content' },
		description: {
			id: 'app.permission.createPrivateContent.desc',
			defaultMessage: 'Allows members to create private messages.',
		},
	}),
};
