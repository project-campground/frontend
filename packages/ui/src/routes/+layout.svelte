<script lang="ts">
	import Main from '$lib/Main/Main.svelte';
	import type { LayoutProps } from './$types.js';

	const { children }: LayoutProps = $props();
</script>

<Main>
	<div class="scrollable">
		<div class="padded">
			{@render children()}
		</div>
	</div>
</Main>

<style lang="scss">
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
		padding: 64px;
	}
</style>
