import { appAppearanceMessages } from './appearance.ts';
import { appBonfireMessages } from './bonfire.ts';
import { appCampsiteMessages } from './campsite.ts';
import { appCommonMessages } from './common.js';
import { appContentMessages } from './content.ts';
import { appMemberBansMessages } from './memberBans.js';
import { appMembersMessages } from './members.ts';
import { appMessageMessages } from './message.ts';
import { appPasswordMessages } from './password.ts';
import { appRolesMessages } from './roles.ts';
import { appSessionMessages } from './session.ts';
import { appTentMessages } from './tent.ts';
import { appUsersMessages } from './user.ts';

export const localeStrings = {
	common: appCommonMessages,
	password: appPasswordMessages,
	users: appUsersMessages,
	appearance: appAppearanceMessages,
	session: appSessionMessages,
	content: appContentMessages,
	// Campsites
	campsites: appCampsiteMessages,
	tents: appTentMessages,
	members: appMembersMessages,
	roles: appRolesMessages,
	memberBans: appMemberBansMessages,
	bonfires: appBonfireMessages,
	messages: appMessageMessages,
};
