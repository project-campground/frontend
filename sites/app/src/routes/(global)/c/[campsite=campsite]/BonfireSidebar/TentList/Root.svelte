<script lang="ts">
	import { Stack } from '@campground/ui';
	import TentListTent, { type TentItem } from './Tent.svelte';
	import TentMover from './TentMover.svelte';
	import { getAppview } from '$lib/context/api.js';

	const {
		categoryId,
		tents,
		domain,
	}: { categoryId?: string | null; tents: TentItem[]; domain: string } = $props();

	const bottomTents = $derived(tents.slice(-1));
	const appview = getAppview();

	async function moveTentToBottom(tentId: string) {
		const position = (bottomTents[0]?.position ?? -1) + 1;

		return appview.tents.move(tentId, { category_id: categoryId, position });
	}
</script>

<Stack gap={0.25}>
	{#each tents as tent (tent.id)}
		<TentListTent
			{tent}
			{domain}
		/>
	{/each}
	<TentMover
		id="0"
		disallowIds={bottomTents.map((x) => x.id)}
		acceptGroups={['tent']}
		onDrop={moveTentToBottom}
	/>
</Stack>
