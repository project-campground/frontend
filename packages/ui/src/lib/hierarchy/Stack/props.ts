import type { FlexAlignItem, FlexDirection, JustifyContent } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';
import type { InFlexLayout, InGridLayout } from '../layout.ts';

export default interface StackProps extends AriaAttributes, InFlexLayout, InGridLayout {
	children?: Snippet;
	class?: ClassValue;
	align?: FlexAlignItem;
	direction?: FlexDirection;
	directionMobile?: FlexDirection;
	justify?: JustifyContent;
	gap?: number;
	wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}
