import type { GradientMotion } from '$lib/info/GradientText/props.ts';
import type {
	ComponentColor,
	ComponentSize,
	ComponentSizeWithNone,
	ComponentVariant,
} from '$lib/types/attributes.js';

export const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const sizesWithNone: ComponentSizeWithNone[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
export const variants: ComponentVariant[] = ['glow', 'solid', 'soft', 'outlined', 'plain'];
export const colors: ComponentColor[] = ['primary', 'success', 'info', 'warning', 'danger'];
