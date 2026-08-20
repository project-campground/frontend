import type SectionProps from '$lib/info/Section/props.ts';
import type { ComponentSize } from '$lib/types/attributes.js';
import type { Snippet } from 'svelte';

export default interface AccordionProps extends Omit<
	SectionProps,
	'gap' | 'header' | 'headerLevel'
> {
	header: Snippet;
	expanded?: boolean;
	size?: ComponentSize;
	noBackground?: boolean;
}
