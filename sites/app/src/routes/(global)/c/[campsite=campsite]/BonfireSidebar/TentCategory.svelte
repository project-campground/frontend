<script lang="ts">
	import type { TentCategoryView } from '$lib/types/campground/tent.js';
	import { Accordion } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const { category, children }: { category: TentCategoryView; children: Snippet } = $props();
</script>

<Accordion>
	{#snippet header()}
		<div>
			{category.name}
		</div>
	{/snippet}
	{@render children()}
</Accordion>
