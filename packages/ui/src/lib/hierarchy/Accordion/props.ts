import type SectionProps from '$lib/info/Section/props.ts';
import type { Snippet } from 'svelte';

export default interface AccordionProps extends Omit<SectionProps, 'header' | 'headerLevel'> {
	header: Snippet;
	expanded?: boolean;
	noPadding?: boolean;
	noBackground?: boolean;
}
