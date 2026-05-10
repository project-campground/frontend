import type { Snippet } from 'svelte';
import type { ComponentSize } from '../types/attributes.ts';
import type { HTMLImgAttributes } from "svelte/elements";

export default interface AvatarProps extends HTMLImgAttributes {
	size?: ComponentSize;
	children?: Snippet;
}
