import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';
import type { BaseTextProps } from '../props.ts';
import type { InFlexLayout } from '$lib/hierarchy/layout.js';

export default interface TextBlockProps extends BaseTextProps, InFlexLayout {
	align?: 'top' | 'center' | 'bottom';
	float?: 'left' | 'right';

	level?: 'background' | 'subtext' | 'body' | 'subheading' | 'heading';

	pl?: number;
	pr?: number;
	hideOnMobile?: boolean;
	class?: ClassValue;

	children?: Snippet;
}
