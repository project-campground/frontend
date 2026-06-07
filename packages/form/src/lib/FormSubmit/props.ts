import type { ButtonProps } from '@campground/ui';
import type { Snippet } from 'svelte';

export default interface FormSubmitProps extends Omit<ButtonProps, 'children' | 'onclick'> {
	children?: Snippet;
}
