<script lang="ts">
	import { loremIpsum, Skeleton } from '@campground/ui';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import { ChatMessageSkeleton } from '$lib/components/index.js';
</script>

<TentWrapper>
	{#snippet icon()}
		<Skeleton>
			<TentIcon
				type="text"
				viewType={0}
			/>
		</Skeleton>
	{/snippet}
	{#snippet title()}
		<Skeleton>
			{loremIpsum.sm}
		</Skeleton>
	{/snippet}
	{#each Array(20).keys() as i (i)}
		<ChatMessageSkeleton index={i} />
	{/each}
</TentWrapper>
