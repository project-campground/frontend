import type { Snippet } from 'svelte';
import type { ComponentColorAll, ComponentSize } from '../../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'glow' | 'inverted' | 'soft' | 'plain';

export default interface ButtonProps extends HTMLButtonAttributes {
	children: Snippet;
	size?: ComponentSize;
	variant?: ButtonVariant;
	color?: ComponentColorAll;
}
