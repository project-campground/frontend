import type { ClassValue, HTMLImgAttributes } from 'svelte/elements';
import type { ComponentSize } from '../types/attributes.ts';

export default interface ImageProps extends HTMLImgAttributes {
	src: string;
	alt?: string | null;
	mw?: number;
	mh?: number;
	w?: number;
	h?: number;
	radius?: ComponentSize | 'none';
	class?: ClassValue;
}
