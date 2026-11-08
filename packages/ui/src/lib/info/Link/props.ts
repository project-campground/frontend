import type { Snippet } from 'svelte';
import type { ComponentColorAll } from '../../types/attributes.ts';
import type { HTMLAnchorAttributes } from 'svelte/elements';

export default interface LinkProps extends HTMLAnchorAttributes {
	children: Snippet;
	underlined?: 'always' | 'hover' | 'never';
	fullWidth?: boolean;
	color?: ComponentColorAll;
}
