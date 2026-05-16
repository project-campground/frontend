import type { Snippet } from 'svelte';
import type { ComponentColorAll, ComponentSize, ComponentVariant } from '../types/attributes.ts';
import type { HTMLButtonAttributes } from "svelte/elements";

export default interface ButtonProps extends HTMLButtonAttributes {
	children: Snippet;
	size?: ComponentSize;
	variant?: ComponentVariant | 'inverted';
	color?: ComponentColorAll;
}
