import type { ButtonProps } from '$lib/form/index.js';
import type { Card, StackProps, DividerProps as ComponentDividerProps } from '$lib/index.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type DialogSize = 'auto' | 'max' | 'full';

export interface RootProps extends HTMLAttributes<HTMLElementTagNameMap['article']> {
	size?: DialogSize | null;
	children?: Snippet;
}
export interface ContentProps extends Card.RootProps {}
export interface HeaderProps {
	left?: Snippet;
	right?: Snippet;
	children?: Snippet;
}
export interface FooterProps extends StackProps {}
export interface DividerProps extends ComponentDividerProps {}

export interface HeaderButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'padding'> {}
export interface CloseProps extends Omit<HeaderButtonProps, 'onclick' | 'color' | 'children'> {}
