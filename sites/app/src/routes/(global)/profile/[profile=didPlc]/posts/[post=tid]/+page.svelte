<script lang="ts">
	import { Threaded } from '@campground/ui';
	import type { PageProps } from './$types.js';
	import ProfilePostPage from './ProfilePostPage.svelte';
	import { ProfilePostSkeleton } from '$lib/components/index.ts';

	const { params }: PageProps = $props();
</script>

<div class="container">
	<svelte:boundary>
		{#snippet pending()}
			<Threaded.Root>
				{#snippet parent()}
					<ProfilePostSkeleton />
				{/snippet}
				{#each [1, 2, 3, 4, 5] as i (i)}
					<Threaded.Item>
						<ProfilePostSkeleton />
					</Threaded.Item>
				{/each}
			</Threaded.Root>
		{/snippet}
		{#snippet failed(error)}
			FAILED: {error}
		{/snippet}
		<ProfilePostPage
			did={params.profile}
			postId={params.post}
		/>
	</svelte:boundary>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		width: 100%;
		background-color: var(--background-subtle);
		box-sizing: border-box;
		overflow-y: auto;

		padding-block: 4rem;
		padding-inline: 20rem;

		@include desktop-md-only {
			padding-inline: 16rem;
		}
		@include desktop-sm-only {
			padding-inline: 12rem;
		}
		@include tablet-only {
			padding-inline: 8rem;
		}
		@include mobile-only {
			padding-block: 1rem;
			padding-inline: 1rem;
		}
	}
</style>
