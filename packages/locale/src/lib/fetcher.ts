import { createIntl, createIntlCache, type IntlCache, type IntlShape } from '@formatjs/svelte-intl';
import type { DefaultMessageSegment } from './FormattedMessage/props.ts';
import type { LocaleId } from './localeList.ts';

export default class LocaleFetcher {
	public cache: IntlCache;
	private prefix: string;
	private locales: Partial<Record<LocaleId, IntlShape<DefaultMessageSegment>>> = {};

	constructor(prefix: string = 'lang') {
		this.cache = createIntlCache();
		this.prefix = prefix;
	}

	createDefaultLocale() {
		return this.createLocale(
			'en-US',
			{}
		);
	}

	createLocale(locale: LocaleId, messages: Record<string, string>) {
		return (this.locales[locale] = createIntl(
			{
				locale,
				defaultLocale: locale,
				messages
			},
			this.cache
		));
	}

	async fetchLocale(locale: LocaleId): Promise<IntlShape<DefaultMessageSegment>> {
		if (this.locales[locale]) return this.locales[locale];

		const resp = await fetch(`/${this.prefix}/${locale}.json`, {
			method: 'GET'
		});

		const respJson = resp.bodyUsed ? await resp.json() : null;

		if (!resp.ok)
			throw new Error(
				`Error while fetching locale '${locale}': ${resp.status} ${respJson?.message || respJson?.error || respJson?.code || resp.statusText}`
			);

		return this.createLocale(locale, respJson);
	}
}
