<script lang="ts">
	import { Card } from '@campground/ui';
	import type { Snippet } from 'svelte';

	const { href, children }: { href: string; children: Snippet } = $props();
</script>

<Card.Root
	size="xs"
	class={['GlobalNavbarButton']}
>
	{@render children()}
	<Card.Click {href} />
</Card.Root>
