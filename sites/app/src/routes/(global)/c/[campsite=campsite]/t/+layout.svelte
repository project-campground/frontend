<script lang="ts">
	import { loremIpsum, PagePlaceholder, PagePlaceholderIcon, Skeleton } from '@campground/ui';
	import TentSkeleton from './TentSkeleton.svelte';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import type { LayoutProps } from './$types.js';

	const { children }: LayoutProps = $props();
</script>

<svelte:boundary>
	{#snippet pending()}
		<TentSkeleton />
	{/snippet}
	{#snippet failed(err)}
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
			<PagePlaceholder icon={PagePlaceholderIcon.Error}>
				{#snippet title()}
					{#if err instanceof Error}
						{err.name}
					{:else}
						{err}
					{/if}
				{/snippet}
				{err}
				{console.error(err)}
			</PagePlaceholder>
		</TentWrapper>
	{/snippet}
	{@render children()}
</svelte:boundary>
