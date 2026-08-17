import type { Snippet } from 'svelte';
import type { ComponentSize, GenericColor } from '../../types/attributes.ts';
import type { HTMLImgAttributes } from 'svelte/elements';

export default interface AvatarProps extends HTMLImgAttributes {
	size?: ComponentSize | 'xxl' | 'xxxl';
	color?: GenericColor | 'neutral';
	children?: Snippet;
}
