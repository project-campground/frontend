import type {
	ComponentColor,
	ComponentSize,
	ComponentSizeWithNone,
	StatusColor,
} from '$lib/types/attributes.js';

export const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const sizesWithNone: ComponentSizeWithNone[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];
export const colors: ComponentColor[] = ['primary', 'success', 'info', 'warning', 'danger'];
export const colorsWithNeutral: (ComponentColor | 'neutral')[] = [...colors, 'neutral'];
export const statusColors: StatusColor[] = [
	'dnd',
	'idle',
	'mention',
	'notification',
	'offline',
	'online',
];
