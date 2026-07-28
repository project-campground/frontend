import type { ComponentOrientation, ComponentSize, StatusColor } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export default interface DividerProps {
	color?: StatusColor | 'neutral' | 'background';
	orientation?: ComponentOrientation;
	class?: ClassValue;
	children?: Snippet;
	thickness?: ComponentSize;
}
