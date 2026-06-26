import type { Snippet } from 'svelte';
import type { ComponentColor, ComponentSize, ComponentVariant } from '../types/attributes.ts';
import type {} from 'svelte/elements';

export default interface AlertProps {
	children: Snippet;
	icon: Snippet;
	size?: ComponentSize;
	color?: ComponentColor;
}
