<script lang="ts">
	import { Card } from '@campground/ui';
	import { BonfireBanner, BonfireContent } from './index.ts';
	import { getCampsiteContext } from '../context.svelte.ts';

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsiteReference);
</script>

<Card.Root
	level="subtle"
	size="xl"
>
	<Card.Overflow
		align="stretch"
		flex={1}
	>
		{#if !campsite}
			<BonfireBanner.Skeleton />
			<BonfireContent.Skeleton />
		{:else}
			<BonfireBanner.Root />
			<BonfireContent.Root />
		{/if}
	</Card.Overflow>
</Card.Root>
