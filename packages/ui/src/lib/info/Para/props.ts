import type { ComponentColorAll, ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export type HeaderLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type RegularParagraphLevel = 'paragraph';
export type SubtitleLevel = 'sub0' | 'sub1';
export type ParaLevel = HeaderLevel | RegularParagraphLevel | SubtitleLevel;
export type TextAlign = 'left' | 'right' | 'center' | 'justify';
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';

export default interface ParaProps {
	fontSize?: number | string;
	letterSpacing?: number | string;
	lineHeight?: number | string;
	weight?: 500 | 600 | 700 | 800 | 900;
	level?: ParaLevel;
	align?: TextAlign;
	textWrap?: TextWrap;
	color?: ComponentColorAll;
	vMargin?: ComponentSize;
	tMargin?: ComponentSize;
	bMargin?: ComponentSize;
	class?: ClassValue;
	children?: Snippet;
}
