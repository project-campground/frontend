import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface GroupProps extends AriaAttributes {
	children?: Snippet;
	class?: ClassValue;
	wrap?: boolean;
	withMobile?: boolean;
	mobileReversed?: boolean;
	gap?: number;
}
