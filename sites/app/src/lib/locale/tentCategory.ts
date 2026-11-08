import { defineMessages } from '@formatjs/svelte-intl';

export const appTentCategoryMessages = defineMessages({
	nominative: {
		id: 'app.tentCategories.nominative',
		defaultMessage: 'tent category',
		description: "Nominative case of 'tent category' (equivalent to 'a tent', 'he')",
	},
	accusative: {
		id: 'app.tentCategories.accusative',
		defaultMessage: 'the tent category',
		description: "Accusative case of 'tent category' (equivalent to 'the tent', 'him')",
	},
	create: { id: 'app.tentCategories.create', defaultMessage: 'Create a tent category' },
	delete: { id: 'app.tentCategories.delete', defaultMessage: 'Delete tent category' },
	settings: { id: 'app.tentCategories.settings', defaultMessage: 'Category settings' },
});
