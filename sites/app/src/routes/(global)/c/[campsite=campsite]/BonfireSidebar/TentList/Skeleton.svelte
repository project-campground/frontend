<script lang="ts">
	import { Stack } from '@campground/ui';
	import ItemSkeleton from './ItemSkeleton.svelte';

	const { tentCount }: { tentCount: number } = $props();
</script>

<Stack gap={0.25}>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each new Array(tentCount) as _, i (i)}
		<ItemSkeleton />
	{/each}
</Stack>
