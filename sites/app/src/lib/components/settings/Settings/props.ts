import type { ModalProps, ButtonProps as TypicalButtonProps } from '@campground/ui';
import type { Component, Snippet } from 'svelte';

export interface CommonProps {
	header: Snippet;
	sidebar: Snippet;
}
export interface DialogProps extends CommonProps {
	children: Snippet;
}
export interface ButtonProps<TPage extends string> extends Omit<
	TypicalButtonProps,
	'onclick' | 'variant'
> {
	page: TPage;
}
export type PageComponent = Component<Record<string, never>>;

export interface RootProps<TPage extends string, TValue = null>
	extends CommonProps, Pick<ModalProps, 'instance'> {
	defaultPage: TPage;
	pages: Record<TPage, PageComponent>;
	value: TValue;
}
