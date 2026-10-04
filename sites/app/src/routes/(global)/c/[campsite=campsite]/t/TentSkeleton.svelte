<script lang="ts">
	import { Card, loremIpsum, Skeleton, Stack } from '@campground/ui';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import { ChatMessage, User } from '$lib/components/index.js';
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
		<ChatMessage.Skeleton index={i} />
	{/each}
</TentWrapper>
<!-- TODO: Add proper tabs and roles skeletons -->
<Card.Root
	level="subtle"
	size="xl"
	padding="sm"
>
	<Stack gap={1}>
		{#each Array(8).keys() as i (i)}
			<User.DisplaySkeleton size="sm" />
		{/each}
	</Stack>
</Card.Root>
