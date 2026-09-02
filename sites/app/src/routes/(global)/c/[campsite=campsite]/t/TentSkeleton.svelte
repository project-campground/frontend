<script>
	import { loremIpsum, Skeleton } from '@campground/ui';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
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
	...
</TentWrapper>
