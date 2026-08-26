<script lang="ts">
	import type { TentCategoryView } from '$lib/types/campground/tent.js';
	import { Accordion, Stack, Para } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const { category, children }: { category: TentCategoryView; children: Snippet } = $props();
</script>

<Accordion
	expanded
	noBackground
>
	{#snippet header()}
		<Stack gap={0}>
			<Para level="h4">
				{category.name}
			</Para>
			{#if category.description}
				<Para level="sub0">
					{category.description}
				</Para>
			{/if}
		</Stack>
	{/snippet}
	{@render children()}
</Accordion>
