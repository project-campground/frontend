import type { LayoutLoad } from './$types.js';

export const load: LayoutLoad = async ({ parent }) => {
	return await parent();
};
