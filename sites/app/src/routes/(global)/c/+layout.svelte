<script lang="ts">
	import { Card, PagePlaceholder, PagePlaceholderIcon } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import { BonfireBanner, BonfireContent } from './[campsite=campsite]/BonfireSidebar/index.ts';
	import FullPageTent from './FullPageTent.svelte';

	const { children }: LayoutProps = $props();
</script>

<div class="container">
	<svelte:boundary>
		{#snippet pending()}
			<Card.Root
				size="xl"
				level="subtle"
			>
				<Card.Overflow>
					<BonfireBanner.Skeleton />
					<BonfireContent.Skeleton />
				</Card.Overflow>
			</Card.Root>
			<FullPageTent>...</FullPageTent>
		{/snippet}
		{#snippet failed(err)}
			<Card.Root
				size="xl"
				level="subtle"
			>
				<Card.Overflow>
					<BonfireBanner.Skeleton />
					<BonfireContent.Skeleton />
				</Card.Overflow>
			</Card.Root>
			<FullPageTent>
				<PagePlaceholder icon={PagePlaceholderIcon.Error}>
					{#snippet title()}
						Error
					{/snippet}
					{err}
					{console.error(err)}
				</PagePlaceholder>
			</FullPageTent>
		{/snippet}
		{@render children()}
	</svelte:boundary>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: grid;
		grid-template-columns: 20rem 1fr 20rem;
		grid-template-rows: 100%;
		padding: 0.5rem;
		gap: 0.5rem;
	}
</style>
