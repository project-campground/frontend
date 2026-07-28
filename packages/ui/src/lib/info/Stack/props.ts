import type { FlexAlignItem, FlexDirection } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface StackProps extends AriaAttributes {
	children?: Snippet;
	class?: ClassValue;
	align?: FlexAlignItem;
	direction?: FlexDirection;
	directionMobile?: FlexDirection;
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
	gap?: number;
}
