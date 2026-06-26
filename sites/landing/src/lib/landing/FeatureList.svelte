<script lang="ts">
	import { observeIntersection, setObserveContext, type ObserveStore } from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	const { children, side }: { children: Snippet; side: Snippet<[string | null]> } = $props();

	const observedItem: ObserveStore = writable(null);

	let currentObservedItem = $state<string | null>(null);
	observedItem.subscribe((value) => (currentObservedItem = value));

	setObserveContext(observedItem);
</script>

<section
	class="FeatureList container"
	{@attach observeIntersection({ store: observedItem, threshold: 0.5 })}
>
	{@render children()}
	<aside class="FeatureList side">
		<div class="FeatureList side-sticky">
			<div class="FeatureList side-items">
				{@render side(currentObservedItem)}
			</div>
		</div>
	</aside>
</section>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(4, 1fr);
		gap: 0 32px;
		padding: 0 var(--Layout-paddingX);
	}
	.side {
		grid-row: 1 / -1;
		grid-column: 2;
		z-index: 5;
		padding-top: 64px;
	}
	.side-sticky {
		position: sticky;
		top: 128px;
		height: calc(max(100vh, 512px));
	}
	.side-items {
		position: relative;
		height: 100%;
		width: 100%;
	}

	@include tablet-down {
		.container {
			grid-template-columns: 1fr;
		}
		.side {
			display: none;
		}
	}
</style>
