import type { Snippet } from 'svelte';
import type { ComponentColorAll, ComponentSize, JustifyContent } from '../../types/attributes.ts';
import type { HTMLButtonAttributes } from 'svelte/elements';
import type { StackedProps } from '$lib/hierarchy/layout.js';
import type { BaseTextProps } from '$lib/info/props.js';

export type ButtonVariant = 'glow' | 'soft' | 'plain' | 'selected';

export default interface ButtonProps
	extends StackedProps, HTMLButtonAttributes, Pick<BaseTextProps, 'textAlign'> {
	children: Snippet;

	fullWidth?: boolean;

	size?: ComponentSize;
	variant?: ButtonVariant;
	color?: ComponentColorAll;
	justify?: JustifyContent;

	padding?: 'default' | 'equal' | 'double';
}
