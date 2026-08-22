import type { FlexAlignItem, FlexDirection, JustifyContent } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface StackProps extends AriaAttributes {
	children?: Snippet;
	class?: ClassValue;
	align?: FlexAlignItem;
	direction?: FlexDirection;
	directionMobile?: FlexDirection;
	justify?: JustifyContent;
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
	flex?: number;
	gap?: number;
}
