import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface FormSimpleFieldProps extends AriaAttributes {
	class?: ClassValue | undefined | null;
	component: Snippet;
	header?: Snippet;
	children?: Snippet;
}
