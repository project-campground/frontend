import type { ClassValue, HTMLImgAttributes } from 'svelte/elements';
import type { ComponentSize } from '../../types/attributes.ts';

export default interface ImageProps extends HTMLImgAttributes {
	src: string;
	alt?: string | null;
	radius?: ComponentSize | 'none';
	class?: ClassValue;

	// Sizing
	mw?: number;
	mh?: number;
	w?: number;
	h?: number;
	fit?: 'contain' | 'cover' | 'fill';
	aspectRatio?: number;
	mobileAspectRatio?: number;
}
