import type { ComponentSizeWithNone, Size } from '@campground/ui';
import type { Snippet } from 'svelte';

export type ImageFieldValue = { url?: string; blob?: string };
export interface ImageDialogProps {
	onSubmit: (values: ImageFieldValue) => unknown;
}
export interface ImageFieldProps {
	radius?: ComponentSizeWithNone | 'avatar';
	width?: Size;
	height?: Size;
	aspectRatio?: number;
	children?: Snippet;
}
