<script lang="ts">
	import { Portals } from '$lib/index.js';
	import Main from '$lib/Main/Main.svelte';
	import type { LayoutProps } from './$types.js';

	const { children }: LayoutProps = $props();
</script>

<Main>
	<Portals.Root>
		<div class="scrollable">
			<div class="padded">
				{@render children()}
			</div>
		</div>
	</Portals.Root>
</Main>

<style lang="scss">
	@use '../lib/index.scss' as *;

	:global(#main) {
		height: 100%;
	}
	.scrollable {
		height: 100%;
		overflow-y: auto;
		position: relative;
	}
	.padded {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 4rem;
		@include tablet-only {
			padding: 2rem;
		}
		@include mobile-only {
			padding: 0.5rem;
		}
	}
</style>
