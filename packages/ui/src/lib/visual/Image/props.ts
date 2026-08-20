import type { ClassValue, HTMLImgAttributes } from 'svelte/elements';
import type { ComponentSize } from '../../types/attributes.ts';
import type { DistanceArgument } from '$lib/util/component.js';
import type { Picture } from '@sveltejs/enhanced-img';

export interface VisualObjectProps {
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
export default interface ImageProps
	extends Omit<HTMLImgAttributes, 'width' | 'height' | 'class' | 'src'>, VisualObjectProps {
	src: string | Picture;
	alt?: string | null;
}
