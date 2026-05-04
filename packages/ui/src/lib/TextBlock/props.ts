import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export default interface TextBlockProps {
	fontSize?: number | string;
	weight?: 500 | 600 | 700 | 800 | 900;
	align?: 'top' | 'center' | 'bottom';
	float?: 'left' | 'right';
	pl?: number;
	pr?: number;
	hideOnMobile?: boolean;
	class?: ClassValue;
	children?: Snippet;
}
