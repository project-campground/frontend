import type { HTMLAttributes } from 'svelte/elements';
import type { VisualObjectProps } from '../Image/props.ts';
import type { GenericColor } from '$lib/types/attributes.js';

export default interface GradientProps
	extends Omit<HTMLAttributes<HTMLElementTagNameMap['div']>, 'class'>, VisualObjectProps {
	color?: GenericColor | 'primary';
}
