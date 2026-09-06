<script lang="ts">
	import { loremIpsum, Skeleton } from '@campground/ui';
	import TentSkeleton from './TentSkeleton.svelte';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import type { LayoutProps } from './$types.js';
	import ErrorPlaceholder from '$lib/components/ErrorPlaceholder.svelte';

	const { children }: LayoutProps = $props();
</script>

<svelte:boundary>
	{#snippet pending()}
		<TentSkeleton />
	{/snippet}
	{#snippet failed(error)}
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
			{console.error(error)}
			<ErrorPlaceholder {error} />
		</TentWrapper>
	{/snippet}
	{@render children()}
</svelte:boundary>
