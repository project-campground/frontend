import { localeIds, type LocaleId } from '@campground/locale';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is LocaleId => {
	return localeIds.includes(param as LocaleId);
}) satisfies ParamMatcher;
