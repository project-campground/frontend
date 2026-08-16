<script lang="ts">
	import { Avatar, Gradient, Group, loremIpsum, Skeleton } from '@campground/ui';
	import type { PageProps } from './$types.js';
	import ProfilePage from './ProfilePage.svelte';
	import ProfilePageHeader from './ProfilePageHeader.svelte';
	import ProfilePageColumn from './ProfilePageColumn.svelte';
	import ProfileFeedSkeleton from './ProfileFeedSkeleton.svelte';

	const { params }: PageProps = $props();
</script>

<div class="container">
	<svelte:boundary>
		{#snippet pending()}
			<ProfilePageHeader>
				{#snippet banner()}
					<div class="stretch">
						<Skeleton
							maxw="100%"
							minw="100%"
							aspectRatio={8}
							mobileAspectRatio={3}
							radius="lg"
						/>
					</div>
				{/snippet}
				{#snippet avatar()}
					<Skeleton radius="avatar">
						<Avatar
							size="xxl"
							src="/DefaultAvatar0.png"
						/>
					</Skeleton>
				{/snippet}
				{#snippet displayName()}
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				{/snippet}
				{#snippet handle()}
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				{/snippet}
				{#snippet tagline()}
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				{/snippet}
			</ProfilePageHeader>
			<ProfilePageColumn>
				<Skeleton>
					{loremIpsum.sm}
				</Skeleton>
			</ProfilePageColumn>
			<ProfilePageColumn>
				<Group gap={2}>
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				</Group>
				<ProfileFeedSkeleton />
			</ProfilePageColumn>
			<ProfilePageColumn>
				<Skeleton>
					{loremIpsum.sm}
				</Skeleton>
			</ProfilePageColumn>
		{/snippet}
		{#snippet failed(error)}
			FAILED: {error}
		{/snippet}
		<ProfilePage did={params.id} />
	</svelte:boundary>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.stretch {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
	}
	.container {
		--Page-padding: 8rem;

		display: grid;
		width: 100%;
		grid-template-columns: 4fr 7fr 4fr;
		grid-template-rows: auto 1fr;
		background-color: var(--background-subtle);
		box-sizing: border-box;
		gap: 2rem 2rem;
		overflow-y: auto;

		padding-block: 1rem;
		padding-inline: var(--Page-padding);

		@include desktop-sm-down {
			grid-template-columns: 4fr 7fr 4fr;
		}
	}
</style>
