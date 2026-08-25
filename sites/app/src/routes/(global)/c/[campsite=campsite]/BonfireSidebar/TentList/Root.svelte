<script lang="ts">
	import { Stack } from '@campground/ui';
	import TentListTent, { type TentItem } from './Tent.svelte';

	const { tents, domain }: { tents: TentItem[]; domain: string } = $props();
</script>

<Stack gap={0.25}>
	{#each tents as tent (tent.id)}
		<TentListTent
			{tent}
			{domain}
		/>
	{/each}
</Stack>
