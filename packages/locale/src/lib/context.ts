import type { DefaultMessageSegment } from '$lib/FormattedMessage/props.js';
import type { IntlShape } from '@formatjs/svelte-intl';
import { createContext } from 'svelte';
import type { Writable } from 'svelte/store';

export const [getLocaleContext, setLocaleContext] =
	createContext<Writable<IntlShape<DefaultMessageSegment>>>();
