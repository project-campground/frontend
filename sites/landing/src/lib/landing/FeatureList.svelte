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

<section class="FeatureList container" {@attach observeIntersection({ store: observedItem, threshold: 0.5 })}>
	<article class="FeatureList list">
		{@render children()}
	</article>
	<aside class="FeatureList side">
		<div class="FeatureList side-sticky">
			<div class="FeatureList side-items">
				{@render side(currentObservedItem)}
			</div>
		</div>
	</aside>
</section>

<style lang="scss">
	.FeatureList {
		&.container {
			display: grid;
			grid-template-columns: 5fr 4fr;
			gap: 32px;
		}
		&.list {
			display: flex;
			flex-direction: column;
		}
		&.side-sticky {
			position: sticky;
			top: 128px;
			height: calc(100vh - 128px * 2);
		}
		&.side-items {
			position: relative;
			height: 100%;
			width: 100%;
		}
	}
</style>
