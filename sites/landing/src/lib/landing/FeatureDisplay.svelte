<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	const { id, currentId, children }: { id: string; currentId: string | null; children: Snippet } =
		$props();
</script>

{#if id === currentId}
	<div
		class="FeatureDisplay"
		transition:fly={{ y: 100, duration: 500 }}
	>
		{@render children()}
	</div>
{/if}

<style lang="scss">
	.FeatureDisplay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
