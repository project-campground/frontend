<script lang="ts">
	import type { Snippet } from 'svelte';
	import GlobalNavbar from './Navbar/Navbar.svelte';

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
		height: 100%;
		width: 100%;
		overflow-y: hidden;

		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		scroll-snap-stop: always;

		@include tablet-only {
			grid-template-rows: 100%;
			grid-template-columns: 50% auto;
		}
		@include mobile-only {
			grid-template-rows: 100%;
			grid-template-columns: 100% auto;
		}
	}
</style>
