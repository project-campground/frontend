<script lang="ts">
	import type { Snippet } from 'svelte';
	import GlobalNavbar from './GlobalNavbar.svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class={['GlobalLayoutRoot']}>
	<GlobalNavbar />
	{@render children()}
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.GlobalLayoutRoot {
		display: grid;
		grid-template-rows: 4rem calc(100% - 4rem);
		grid-template-columns: 20rem 1fr 20rem;
		height: 100%;
		width: 100%;
		overflow-y: hidden;
		gap: 0 0.5rem;

		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		scroll-snap-stop: always;

		@include tablet-only {
			grid-template-rows: 100%;
			grid-template-columns: 50% 50% 100% 50%;
		}
		@include mobile-only {
			grid-template-rows: 100%;
			grid-template-columns: 100% 100% 200% 100%;
		}
	}
</style>
