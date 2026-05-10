import { LocaleFetcher, type DefaultMessageSegment } from '@campground/locale';
import { createIntl } from '@formatjs/svelte-intl';
import { get, readable, writable } from 'svelte/store';

export const localeFetcherStore = readable(new LocaleFetcher());
export const globalAppLocale = writable(
	createIntl<DefaultMessageSegment>(
		{
			locale: 'en-US',
			defaultLocale: 'en-US',
			messages: {}
		},
		get(localeFetcherStore).cache
	)
);
