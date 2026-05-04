import type { Snippet } from 'svelte';
import type { ComponentSize } from '../../types/attributes.ts';

export default interface AvatarProps {
	src?: string | null;
	alt?: string | null;
	size?: ComponentSize;
	children?: Snippet;
}
