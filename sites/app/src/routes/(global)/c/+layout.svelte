<script lang="ts">
	import type { LayoutProps } from './$types.js';

	const { children }: LayoutProps = $props();
</script>

<div class="container">
	<svelte:boundary>
		{#snippet pending()}
			Loading campsite...
		{/snippet}
		{#snippet failed(err)}
			Err: {err}
		{/snippet}
		{@render children()}
	</svelte:boundary>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: grid;
		grid-template-columns: 20rem 1fr 20rem;
		padding: 0.5rem;
		gap: 0.5rem;
	}
</style>
