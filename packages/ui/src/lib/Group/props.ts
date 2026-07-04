import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface GroupProps extends AriaAttributes {
	children?: Snippet;
	class?: ClassValue;
	alignVertically?: 'start' | 'stretch' | 'center' | 'end';
	wrap?: boolean;
	withMobile?: boolean;
	mobileReversed?: boolean;
	reversed?: boolean;
	gap?: number;
}
