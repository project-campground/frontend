import type { Snippet } from 'svelte';
import type { ComponentColor, ComponentSize, ComponentVariant } from '../types/attributes.ts';
import type { HTMLButtonAttributes, MouseEventHandler } from "svelte/elements";

export default interface ButtonProps extends HTMLButtonAttributes {
	children: Snippet;
	size?: ComponentSize;
	variant?: ComponentVariant;
	color?: ComponentColor;
}
