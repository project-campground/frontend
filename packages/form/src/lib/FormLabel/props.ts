import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export default interface FormLabelProps extends AriaAttributes {
	hideAsterisk?: boolean;
	subtle?: boolean;
	children: Snippet;
}
