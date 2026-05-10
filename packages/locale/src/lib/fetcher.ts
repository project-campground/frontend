import { createIntl, createIntlCache, type IntlCache, type IntlShape } from '@formatjs/svelte-intl';
import type { DefaultMessageSegment } from './FormattedMessage/props.ts';

export type LocaleId =
	| 'en-US'
	| 'ar-SA'
	| 'de-DE'
	| 'es-ES'
	| 'fr-FR'
	| 'hu-HU'
	| 'it-IT'
	| 'pl-PL'
	| 'ru-RU'
	| 'tr-TR'
	| 'uk-UA';

export default class LocaleFetcher {
	public cache: IntlCache;
	private prefix: string;
	private locales: Partial<Record<LocaleId, IntlShape<DefaultMessageSegment>>> = {};

	constructor(prefix: string = 'lang') {
		this.cache = createIntlCache();
		this.prefix = prefix;
	}

	async fetchLocale(locale: LocaleId): Promise<IntlShape<DefaultMessageSegment>> {
		if (this.locales[locale]) return this.locales[locale];

		return (this.locales[locale] = await fetch(`/${this.prefix}/${locale}.json`, {
			method: 'GET'
		})
			.then(async (resp) => {
				const respJson = await resp.json();

				if (!resp.ok)
					throw new Error(
						`Error while fetching locale: ${respJson.message || respJson.error || respJson.code || resp.status}`
					);

				return respJson;
			})
			.then((messages) =>
				createIntl(
					{
						locale,
						defaultLocale: locale,
						messages
					},
					this.cache
				)
			))!;
	}
}
