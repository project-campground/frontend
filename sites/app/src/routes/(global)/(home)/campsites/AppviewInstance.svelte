<script lang="ts">
	import { Accordion, Alert, Group, Svg, TextBlock } from '@campground/ui';
	import AppviewInstanceCampsites from './AppviewInstanceCampsites.svelte';
	import CampsiteButtonSkeleton from '../../Navbar/CampsiteButtonSkeleton.svelte';
	import { IconExclamationCircleFilled } from '@tabler/icons-svelte';

	const { domain }: { domain: string } = $props();
</script>

<Accordion
	expanded
	size="lg"
>
	{#snippet header()}
		<Group gap={0.5}>
			<Svg.Logo size={2} />
			{domain.split('/')[2]}
		</Group>
	{/snippet}
	<div class="grid">
		<svelte:boundary>
			{#snippet pending()}
				{#each [1, 2, 3, 4, 5, 6] as i (i)}
					<CampsiteButtonSkeleton />
				{/each}
			{/snippet}
			{#snippet failed(err)}
				<div class="fullSpan">
					<Alert color="warning">
						{#snippet icon()}
							<IconExclamationCircleFilled />
						{/snippet}
						{err}
					</Alert>
				</div>
			{/snippet}
			<AppviewInstanceCampsites {domain} />
		</svelte:boundary>
	</div>
</Accordion>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.5rem;
		padding: 0.5rem;
	}
	.fullSpan {
		grid-column: 1 / 4;
	}
</style>
