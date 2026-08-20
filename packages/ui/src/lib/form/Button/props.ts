import type { Snippet } from 'svelte';
import type { ComponentColorAll, ComponentSize, JustifyContent } from '../../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = 'glow' | 'soft' | 'plain' | 'selected';

export default interface ButtonProps extends HTMLButtonAttributes {
	children: Snippet;
	size?: ComponentSize;
	variant?: ButtonVariant;
	color?: ComponentColorAll;
	justify?: JustifyContent;

	padding?: 'default' | 'equal';
}
