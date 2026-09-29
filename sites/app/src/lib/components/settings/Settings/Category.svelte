<script lang="ts">
	import { Accordion, type AccordionProps } from '@campground/ui';

	const { children, ...attributes }: Pick<AccordionProps, 'header' | 'children'> = $props();
</script>

<Accordion
	noBackground
	expanded
	{...attributes}
>
	<div class="section">
		{@render children?.()}
	</div>
</Accordion>

<style lang="scss">
	.section {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
		padding: 0.5rem;
	}
</style>
