import type { ComponentSizeWithNone } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { VisualObjectProps } from '../Image/props.ts';

export interface SkeletonProps
	extends
		HTMLAttributes<HTMLElementTagNameMap['div']>,
		Pick<
			VisualObjectProps,
			'w' | 'h' | 'minh' | 'maxh' | 'minw' | 'maxw' | 'aspectRatio' | 'mobileAspectRatio'
		> {
	radius?: ComponentSizeWithNone | 'avatar';
	children?: Snippet;
}
