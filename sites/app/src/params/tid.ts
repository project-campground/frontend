import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is string => {
	return /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(param);
}) satisfies ParamMatcher;
