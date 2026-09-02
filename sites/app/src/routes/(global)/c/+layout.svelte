<script lang="ts">
	import { PagePlaceholder, PagePlaceholderIcon } from '@campground/ui';
	import type { LayoutProps } from './$types.js';

	const { children }: LayoutProps = $props();
</script>

<div class="container">
	<svelte:boundary>
		{#snippet pending()}
			<div class="full">...</div>
		{/snippet}
		{#snippet failed(err)}
			<div class="full">
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
			</div>
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
	.full {
		grid-column: 1 / 4;
	}
</style>
