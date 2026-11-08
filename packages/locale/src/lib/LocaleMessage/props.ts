import type { IntlShape, MessageDescriptor } from '@formatjs/svelte-intl';
import type { FormatXMLElementFn, Options } from 'intl-messageformat';
import type { Snippet } from 'svelte';

type PrimitiveType = boolean | number | string | null | undefined | bigint | Date;

export interface LocaleMessagePropsGeneric<
	T,
	TValue extends T | FormatXMLElementFn<T>,
> extends MessageDescriptor {
	locale?: IntlShape<DefaultMessageSegment>;
	values?: Record<string, PrimitiveType | TValue>;
	options?: Options;
}
export type DefaultMessageSegment = string | Snippet;
export interface LocaleMessageProps extends LocaleMessagePropsGeneric<
	DefaultMessageSegment,
	DefaultMessageSegment | FormatXMLElementFn<DefaultMessageSegment>
> {}
