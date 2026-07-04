import type SectionProps from '$lib/Section/props.ts';
import type { Snippet } from 'svelte';

export default interface AccordionProps extends Omit<SectionProps, 'header' | 'headerLevel'> {
	header: Snippet;
	expanded?: boolean;
	noBackground?: boolean;
}
