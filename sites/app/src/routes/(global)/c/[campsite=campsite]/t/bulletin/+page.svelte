<script lang="ts">
	import { Card, Para } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import TentWrapper from '../TentWrapper.svelte';
	import { IconLayout2Filled } from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import ProfileBanner from '$lib/components/pages/ProfileBanner.svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import ProfileAvatarWrapper from '$lib/components/pages/ProfileAvatarWrapper.svelte';
	import { localeStrings } from '$lib/locale/index.js';

	const campsiteContext = getCampsiteContext();
	const campsite = $derived(campsiteContext.campsiteReference?.campsite);

	$effect(() => {
		if (campsiteContext.campsiteReference?.campsite.bonfires[0].id)
			campsiteContext.setActiveBonfire(campsiteContext.campsiteReference?.campsite.bonfires[0].id);
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
			<ProfileBanner
				id={campsite.id.slice(-1)}
				src={campsite.bannerUri}
				aspectRatio={7}
			/>
			<div class="avatar">
				<ProfileAvatarWrapper>
					<ProfileAvatar
						id={campsite.id.slice(-1)}
						src={campsite.avatarUri ?? undefined}
						size="xxl"
					>
						{campsite.name[0].toUpperCase()}
					</ProfileAvatar>
				</ProfileAvatarWrapper>
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
		{:else}
			...
		{/if}
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
		margin-top: -3rem;
	}
</style>
