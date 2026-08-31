import type { Size } from '$lib/util/component.js';

export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
export type TextOverflow = 'clip' | 'ellipsis' | '-';
export type TextWhitespace = 'pre' | 'pre-wrap' | 'pre-line';

export interface BaseTextProps {
	fontSize?: Size;
	weight?: 400 | 500 | 600 | 700 | 800 | 900;
	textWrap?: TextWrap;
	whitespace?: TextWhitespace;
	overflow?: TextOverflow;
}

export function baseTextProps({ weight, textWrap, whitespace, overflow, ...props }: BaseTextProps) {
	return {
		'data-weight': weight,
		'data-text-wrap': textWrap,
		'data-whitespace': whitespace,
		'data-text-overflow': overflow,
		...props,
	};
}
