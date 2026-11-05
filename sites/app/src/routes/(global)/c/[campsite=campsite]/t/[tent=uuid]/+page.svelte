<script lang="ts">
	import { loremIpsum, Skeleton } from '@campground/ui';
	import TentSkeleton from '../TentSkeleton.svelte';
	import TentWrapper from '../TentWrapper.svelte';
	import type { PageProps } from './$types.js';
	import TentPage from './TentPage.svelte';
	import TentIcon from '#lib/components/tents/TentIcon.svelte';
	import ErrorPlaceholder from '#lib/components/ErrorPlaceholder.svelte';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import { filter } from 'rxjs';
	import type { WSFrameWithPayload } from '#lib/api/ws/message.js';
	import type { TentViewBasic } from '#lib/types/campground/tent.js';
	import { goto } from '$app/navigation';

	const { params }: PageProps = $props();

	const campsiteContext = getCampsiteContext();
	
	const tentId = $derived(params.tent);

	$effect(() => {
		if (!campsiteContext.campsiteReference)
			return;

		campsiteContext.webSocket!.messages
			.pipe(filter((value) => (console.log('Value', value), value.op === 1 && value.t === 'TentDeleted')))
			.subscribe((messageUntyped) => {
				const message = messageUntyped as WSFrameWithPayload<TentViewBasic>;

				console.log('Message payload', message.payload.id, tentId, message.payload.id === tentId);
				// Tent deleted, go elsewhere
				if (message.payload.id === tentId)
					goto(`/c/${campsiteContext.campsite!.id}@${campsiteContext.domain}/t/bulletin`);
			});
	});
</script>

<svelte:boundary>
	{#snippet pending()}
		<TentSkeleton />
	{/snippet}
	{#snippet failed(errorObject)}
		<TentWrapper gridColumn="2/4">
			{#snippet icon()}
				<Skeleton>
					<TentIcon
						type="text"
						viewType={0}
					/>
				</Skeleton>
			{/snippet}
			{#snippet title()}
				<Skeleton>
					{loremIpsum.sm}
				</Skeleton>
			{/snippet}
			<div class="error">
				{#if (errorObject as { error?: unknown }).error}
					{const error = (errorObject as { error?: unknown; }).error}
					<ErrorPlaceholder {error} />
				{:else}
					<ErrorPlaceholder error={errorObject} />
				{/if}
			</div>
		</TentWrapper>
	{/snippet}
	<TentPage {tentId} />
</svelte:boundary>

<style lang="scss">
	.error {
		display: flex;
		flex-direction: column;

		padding: 8rem 12rem;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		flex: 1;
		overflow: hidden;
	}
</style>

