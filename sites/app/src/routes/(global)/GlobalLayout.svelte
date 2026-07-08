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
		grid-template-rows: 64px calc(100% - 64px);
		grid-template-columns: 320px 1fr 320px;
		height: 100%;
		width: 100%;
		overflow-y: hidden;
		gap: 0 8px;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		scroll-snap-stop: always;

		@include tablet-only {
			grid-template-rows: 100%;
			grid-template-columns: 50% 50% 100% 50%;
		}
		@include mobile-only {
			grid-template-rows: 100%;
			grid-template-columns: 100% 100% 1000% 100%;
		}
	}
</style>
