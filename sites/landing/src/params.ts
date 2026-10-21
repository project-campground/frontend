import { defineParams } from '@sveltejs/kit/params';
import { localeIds, type LocaleId } from '@campground/locale';

const matchLang = (param: string): param is LocaleId => {
	return localeIds.includes(param as LocaleId);
};

export const params = defineParams({ lang: (param) => (matchLang(param) ? param : undefined) });
