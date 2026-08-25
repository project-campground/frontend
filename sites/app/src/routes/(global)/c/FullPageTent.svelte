<script lang="ts">
	import { Card } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<Card.Root
	level="subtle"
	size="xl"
	gridColumn="2/4"
>
	{@render children()}
</Card.Root>
