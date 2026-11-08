<script lang="ts">
	import { Card, Para } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import TentWrapper from '../TentWrapper.svelte';
	import { IconLayout2Filled } from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '#lib/locale/index.js';
	import { CampsiteCard } from '#lib/components/pages/index.js';

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsiteReference?.campsite);

	$effect(() => {
		if (campsiteContext.homeBonfire && !campsiteContext.openBonfire)
			campsiteContext.setActiveBonfire(campsiteContext.homeBonfire.id);
	});
</script>

<TentWrapper>
	{#snippet icon()}
		<IconLayout2Filled />
	{/snippet}
	{#snippet title()}
		<LocaleMessage {...localeStrings.tents.bulletin} />
	{/snippet}
	<div class="content">
		{#if campsite}
			<CampsiteCard.Root
				{campsite}
				size="xxl"
			/>
		{:else}
			<CampsiteCard.Skeleton size="xxl" />
		{/if}
	</div>
</TentWrapper>
<Card.Root
	size="xl"
	level="subtle"
>
	<Card.Content>...</Card.Content>
</Card.Root>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 1rem;
	}
</style>
