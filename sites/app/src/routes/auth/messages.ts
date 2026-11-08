import { defineMessages } from '@formatjs/svelte-intl';

export const authMessages = defineMessages({
	expectedPds: {
		id: `info.pds.error`,
		defaultMessage: `Expected a valid URL for PDS`,
		description: `Error when the submitted PDS is invalid URL`,
	},
});
