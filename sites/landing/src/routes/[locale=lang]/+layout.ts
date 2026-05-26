import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

const defaultLocale = 'en-US';

export const load: LayoutLoad = async ({ params: { locale }, url }) => {
	const relativePath = url.href
		.substring((url.protocol + '//' + url.host + '/').length)
		.split('/');
    const pathInDefaultLocale = [defaultLocale, ...relativePath.slice(1)].join('/');

	if (!locale)
		redirect(302, pathInDefaultLocale);

    const localeResp = await fetch(`/lang/${locale}.json`, {
        method: 'GET'
    });

    if (!localeResp.ok && locale !== defaultLocale)
        redirect(302, pathInDefaultLocale);

    const json = localeResp.bodyUsed ? await localeResp.json() : {};

    return json;
};

export const ssr = false;