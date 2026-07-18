import type { Snippet } from 'svelte';
import type { AriaAttributes, ClassValue } from 'svelte/elements';

export default interface PortalsProps extends AriaAttributes {
	class?: ClassValue;
	children: Snippet;
}
