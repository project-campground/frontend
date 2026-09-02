import {
	createIntl,
	createIntlCache,
	type IntlCache,
	type IntlShape,
	type MessageDescriptor,
} from '@formatjs/svelte-intl';
import type { DefaultMessageSegment } from './LocaleMessage/props.ts';
import type { LocaleId } from './localeList.ts';
import { createContext } from 'svelte';

interface Message {
	description: string;
	message: string;
}

type Shape = IntlShape<DefaultMessageSegment>;

export class LocaleContext {
	public cache: IntlCache;
	public shape: Shape;
	private prefix: string;
	public savedShapes: Partial<Record<LocaleId, Shape>> = {};

	constructor(prefix: string = 'lang') {
		this.cache = createIntlCache();
		this.prefix = prefix;
		this.shape = $state(this.createDefaultLocale());
	}

	public get id(): LocaleId {
		return this.shape.locale as LocaleId;
	}

	public formatMessage<T extends DefaultMessageSegment | DefaultMessageSegment[] = string>(
		descriptor: MessageDescriptor,
		values?: Parameters<IntlShape<DefaultMessageSegment>['formatMessage']>[1],
		options?: Parameters<IntlShape<DefaultMessageSegment>['formatMessage']>[2],
	) {
		return this.shape.formatMessage(descriptor, values, options) as T;
	}

	public async setLocale(locale: LocaleId) {
		const fetchedLocale = await this.fetchLocale(locale);
		return (this.shape = fetchedLocale);
	}

	public createDefaultLocale() {
		return this._createLocale('en-US', {});
	}

	private _createLocale(locale: LocaleId, messages: Record<string, Message>) {
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
	private _createCachedLocale(locale: LocaleId, messages: Record<string, Message>) {
		return (this.savedShapes[locale] = this._createLocale(locale, messages));
	}

	public async fetchLocale(locale: LocaleId): Promise<IntlShape<DefaultMessageSegment>> {
		if (this.savedShapes[locale]) return this.savedShapes[locale];

		const resp = await fetch(`/${this.prefix}/${locale}.json`, { method: 'GET' });

		const respJson = await resp.json();

		if (!resp.ok)
			throw new Error(
				`Error while fetching locale '${locale}': ${resp.status} ${respJson?.message || respJson?.error || respJson?.code || resp.statusText}`,
			);

		return this._createCachedLocale(locale, respJson);
	}
}

export const [getLocale, setLocale] = createContext<LocaleContext>();
