<script lang="ts">
	import { Card, Para } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import TentWrapper from '../../TentWrapper.svelte';
	import { IconLayout2Filled } from '@tabler/icons-svelte';
	import { FormattedMessageGlobal } from '@campground/locale';
	import ProfileBanner from '$lib/components/pages/ProfileBanner.svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import { onMount } from 'svelte';

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsite!);

	onMount(() => campsiteContext.setOpenBonfire(campsite.bonfires[0].id));
</script>

<TentWrapper>
	{#snippet icon()}
		<IconLayout2Filled />
	{/snippet}
	{#snippet title()}
		<FormattedMessageGlobal id="app.tents.bulletin" />
	{/snippet}
	<div class="content">
		<ProfileBanner
			id={campsite.id}
			src={campsite.bannerUri}
			aspectRatio={7}
		/>
		<div class="avatar">
			<ProfileAvatar
				id={campsite.id}
				src={campsite.avatarUri ?? undefined}
				size="xxl"
			>
				{campsite.name[0].toUpperCase()}
			</ProfileAvatar>
		</div>
		<Para
			level="h2"
			mt="sm"
		>
			{campsite.name}
		</Para>
		<Para mt="sm">
			{campsite.description}
		</Para>
	</div>
</TentWrapper>
<Card.Root
	level="subtle"
	size="xl">Abcd</Card.Root
>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
	}
	.avatar {
		width: fit-content;
		height: fit-content;
		box-sizing: border-box;
		border: solid 0.25rem var(--background-subtle);
		margin-top: -3rem;
		border-radius: 35%;
	}
</style>
