import type { Snippet } from 'svelte';
import type {
	ComponentColor,
	ComponentOrientation,
	ComponentSize,
} from '../../types/attributes.ts';
import type { HTMLAttributes } from 'svelte/elements';

export interface RootProps extends Omit<HTMLAttributes<HTMLElementTagNameMap['div']>, 'size'> {
	size?: ComponentSize;
	orientation?: ComponentOrientation;
	active?: number;
	children: Snippet;
}
export interface StepProps extends Omit<HTMLAttributes<HTMLElementTagNameMap['div']>, 'size'> {
	color?: ComponentColor;
	icon: Snippet;
	children: Snippet;
}
