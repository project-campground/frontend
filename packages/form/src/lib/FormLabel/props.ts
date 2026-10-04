import type { InFlexLayout } from '@campground/ui';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export default interface FormLabelProps extends InFlexLayout, AriaAttributes {
	hideAsterisk?: boolean;
	subtle?: boolean;
	children: Snippet;
}
