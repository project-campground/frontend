import type { ComponentSizeWithNone, DistanceArgument } from '@campground/ui';
import type { Snippet } from 'svelte';

export type FormImageFieldValue = { url?: string; blob?: string };
export interface FormImageDialogProps {
	onSubmit: (values: FormImageFieldValue) => unknown;
}
export interface FormImageFieldProps {
	radius?: ComponentSizeWithNone | 'avatar';
	width?: DistanceArgument;
	height?: DistanceArgument;
	aspectRatio?: number;
	children?: Snippet;
}
