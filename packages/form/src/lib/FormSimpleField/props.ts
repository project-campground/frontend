import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface FormSimpleFieldProps extends AriaAttributes {
	class?: ClassValue | undefined | null;
	reverse?: boolean;
	component: Snippet;
	header?: Snippet;
	children?: Snippet;
}
