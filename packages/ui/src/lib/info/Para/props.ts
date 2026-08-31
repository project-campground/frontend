import type { ComponentColorAll, ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';
import type { BaseTextProps } from '../props.ts';
import type { Size } from '$lib/util/component.js';

export type HeaderLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type RegularParagraphLevel = 'paragraph';
export type SubtitleLevel = 'sub0' | 'sub1';
export type ParaLevel = HeaderLevel | RegularParagraphLevel | SubtitleLevel;
export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export default interface ParaProps extends BaseTextProps {
	letterSpacing?: Size;
	lineHeight?: Size;
	level?: ParaLevel;
	align?: TextAlign;
	color?: ComponentColorAll;
	mv?: ComponentSize;
	mt?: ComponentSize;
	mb?: ComponentSize;
	class?: ClassValue;
	children?: Snippet;
}
