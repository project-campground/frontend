import type { Snippet } from 'svelte';
import type { HTMLTextareaAttributes } from 'svelte/elements';

export default interface FormTextAreaProps extends Omit<
	HTMLTextareaAttributes,
	'id' | 'maxlength' | 'minlength' | 'maxrows'
> {
	top?: Snippet;
	bottom?: Snippet;
	rows?: number;
	maxRows?: number;
	maxLength?: number;
	minLength?: number;
}
