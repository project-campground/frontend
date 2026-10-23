import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type ButtonVariant = 'glow' | 'soft' | 'plain' | 'selected';

export default interface ButtonGroupProps extends HTMLAttributes<HTMLElementTagNameMap['section']> {
	children: Snippet;
	direction?: 'horizontal' | 'vertical';
}
