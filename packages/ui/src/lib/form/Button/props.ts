import type { Snippet } from 'svelte';
import type { ComponentColorAll, ComponentSize, JustifyContent } from '../../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { StackableProps } from '$lib/hierarchy/layout.js';

export type ButtonVariant = 'glow' | 'soft' | 'plain' | 'selected';

export default interface ButtonProps extends StackableProps, HTMLButtonAttributes {
	children: Snippet;

	fullWidth?: boolean;

	size?: ComponentSize;
	variant?: ButtonVariant;
	color?: ComponentColorAll;
	justify?: JustifyContent;

	padding?: 'default' | 'equal';
}
