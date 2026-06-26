import type { MessageDescriptor } from '@formatjs/svelte-intl';
import type { FormatXMLElementFn, Options } from 'intl-messageformat';
import type { Snippet } from 'svelte';

type PrimitiveType = boolean | number | string | null | undefined | bigint | Date;

export interface FormattedMessagePropsGeneric<
	T,
	TValue extends T | FormatXMLElementFn<T>,
> extends MessageDescriptor {
	values?: Record<string, PrimitiveType | TValue>;
	options?: Options;
}
export type DefaultMessageSegment = string | Snippet;
export default interface FormattedMessageProps extends FormattedMessagePropsGeneric<
	DefaultMessageSegment,
	DefaultMessageSegment | FormatXMLElementFn<DefaultMessageSegment>
> {}
