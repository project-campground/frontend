<script lang="ts">
	import { PagePlaceholder } from '@campground/ui';
	import type { LayoutProps } from './$types.js';
	import ErrorPlaceholder from '$lib/components/ErrorPlaceholder.svelte';

	const { children }: LayoutProps = $props();
</script>

<div class="container">
	<svelte:boundary>
		{#snippet pending()}
			<div class="full">...</div>
		{/snippet}
		{#snippet failed(error)}
			<div class="full">
				<ErrorPlaceholder {error} />
				{console.error(error)}
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
