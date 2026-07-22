import type { ClassValue, HTMLImgAttributes } from 'svelte/elements';
import type { ComponentSize } from '../../types/attributes.ts';
import type { DistanceArgument } from '$lib/util/component.js';

export default interface ImageProps extends Omit<HTMLImgAttributes, 'width' | 'height'> {
	src: string;
	alt?: string | null;
	radius?: ComponentSize | 'none';
	class?: ClassValue;

	// Sizing
	maxw?: DistanceArgument;
	maxh?: DistanceArgument;
	minw?: DistanceArgument;
	minh?: DistanceArgument;
	w?: DistanceArgument;
	h?: DistanceArgument;
	fit?: 'contain' | 'cover' | 'fill';
	aspectRatio?: number;
	mobileAspectRatio?: number;
}
