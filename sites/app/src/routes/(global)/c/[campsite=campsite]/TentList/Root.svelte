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

		return appview.tents.move(tentId, { categoryId: categoryId ?? '', position });
	}

	async function onMoveTo(movedTentId: string, movedToTentId: string) {
		const movedToTent = tents.find((x) => x.id === movedToTentId);
		const isInCategory = tents.findIndex((x) => x.id === movedTentId) >= 0;

		return appview.tents.move(movedTentId, {
			categoryId: isInCategory ? undefined : (categoryId ?? ''),
			position: movedToTent?.position ?? 0,
		});
	}
</script>

<Stack gap={0.25}>
	{#each tents as tent (tent.id)}
		<TentListTent
			{tent}
			{domain}
			{onMoveTo}
		/>
	{/each}
	<TentMover
		id="0"
		disallowIds={bottomTents.map((x) => x.id)}
		acceptGroups={['tent']}
		onDrop={moveTentToBottom}
	/>
</Stack>
