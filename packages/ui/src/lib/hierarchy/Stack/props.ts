import type { Snippet } from 'svelte';
import type { ClassValue, HTMLAttributes } from 'svelte/elements';
import type { InFlexLayout, InGridLayout, StackedProps } from '../layout.ts';

export default interface StackProps
	extends StackedProps, HTMLAttributes<HTMLElementTagNameMap['div']>, InFlexLayout, InGridLayout {
	children?: Snippet;
	class?: ClassValue;
	gap?: number;
}
