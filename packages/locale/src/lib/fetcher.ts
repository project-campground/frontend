import {
	createIntl,
	createIntlCache,
	type IntlCache,
	type IntlShape,
	type MessageDescriptor,
} from '@formatjs/svelte-intl';
import type { DefaultMessageSegment } from './FormattedMessage/props.ts';
import type { LocaleId } from './localeList.ts';

interface Message {
	description: string;
	message: string;
}

export default class LocaleFetcher {
	public cache: IntlCache;
	private prefix: string;
	private locales: Partial<Record<LocaleId, IntlShape<DefaultMessageSegment>>> = {};

	constructor(prefix: string = 'lang') {
		this.cache = createIntlCache();
		this.prefix = prefix;
	}

	createDefaultLocale() {
		return this.createLocale('en-US', {});
	}

	createLocale(locale: LocaleId, messages: Record<string, Message>) {
		return createIntl<DefaultMessageSegment>(
			{
				locale,
				defaultLocale: locale,
				messages: Object.fromEntries(
					Object.entries(messages).map(([key, { message }]) => [key, message]),
				),
			},
			this.cache,
		);
	}
	createCachedLocale(locale: LocaleId, messages: Record<string, Message>) {
		return (this.locales[locale] = this.createLocale(locale, messages));
	}

	async fetchLocale(locale: LocaleId): Promise<IntlShape<DefaultMessageSegment>> {
		if (this.locales[locale]) return this.locales[locale];

		const resp = await fetch(`/${this.prefix}/${locale}.json`, { method: 'GET' });

		const respJson = await resp.json();

		if (!resp.ok)
			throw new Error(
				`Error while fetching locale '${locale}': ${resp.status} ${respJson?.message || respJson?.error || respJson?.code || resp.statusText}`,
			);

		return this.createCachedLocale(locale, respJson);
	}
}
