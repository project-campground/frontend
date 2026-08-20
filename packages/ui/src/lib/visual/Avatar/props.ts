import type { Snippet } from 'svelte';
import type { ComponentSize, GenericColor } from '../../types/attributes.ts';
import type { HTMLImgAttributes } from 'svelte/elements';
import type { Picture } from '@sveltejs/enhanced-img';

export default interface AvatarProps extends Omit<HTMLImgAttributes, 'src'> {
	src?: string | Picture;
	size?: ComponentSize | 'xxl' | 'xxxl';
	color?: GenericColor | 'neutral';
	children?: Snippet;
}
