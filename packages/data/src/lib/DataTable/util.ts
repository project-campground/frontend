import type { Span } from './props.ts';

export function fromSpan(span?: Span | number | null) {
	return span !== null && typeof span === 'object' ? `${span.from} / ${span.to + 1}` : span;
}
