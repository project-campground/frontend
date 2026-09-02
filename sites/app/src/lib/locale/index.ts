import { appAppearanceMessages } from './appearance.ts';
import { appBonfireMessages } from './bonfire.ts';
import { appCampsiteMessages } from './campsite.ts';
import { appCommonMessages } from './common.js';
import { appContentMessages } from './content.ts';
import { appMessageMessages } from './message.ts';
import { appPasswordMessages } from './password.ts';
import { appSessionMessages } from './session.ts';
import { appTentMessages } from './tent.ts';
import { appUsersMessages } from './user.ts';

export const localeStrings = {
	common: appCommonMessages,
	password: appPasswordMessages,
	users: appUsersMessages,
	appearance: appAppearanceMessages,
	session: appSessionMessages,
	// Content
	content: appContentMessages,
	campsites: appCampsiteMessages,
	tents: appTentMessages,
	bonfires: appBonfireMessages,
	messages: appMessageMessages,
};
