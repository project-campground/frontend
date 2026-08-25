<script lang="ts">
	import ProfileBanner from '$lib/components/pages/ProfileBanner.svelte';
	import { Group, Para, Stack, Button } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import ProfileAvatarWrapper from '$lib/components/pages/ProfileAvatarWrapper.svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import { IconDotsFilled } from '@tabler/icons-svelte';
	import Layout from './Layout.svelte';
	import Skeleton from './Skeleton.svelte';

	const campsiteContext = getCampsiteContext();
	const currentBonfire = $derived(campsiteContext.tents?.bonfire);
</script>

{#if currentBonfire}
	<Layout>
		{#snippet banner()}
			<ProfileBanner
				id={currentBonfire.id.slice(-1)}
				src={currentBonfire.bannerUri}
				aspectRatio={2.5}
			/>
		{/snippet}
		<ProfileAvatarWrapper>
			<ProfileAvatar
				size="sm"
				id={currentBonfire.id.slice(-1)}
				src={currentBonfire.avatarUri ?? undefined}
			>
				{currentBonfire.name[0].toUpperCase()}
			</ProfileAvatar>
		</ProfileAvatarWrapper>
		<Stack
			gap={0}
			flex={1}
		>
			<Para level="h4">
				{currentBonfire?.name}
			</Para>
			<Para level="sub0">
				{currentBonfire?.description}
			</Para>
		</Stack>
		<Group>
			<Button
				size="sm"
				padding="equal"
				color="neutral"
				variant="plain"
			>
				<IconDotsFilled size="1.5rem" />
			</Button>
		</Group>
	</Layout>
{:else}
	<Skeleton />
{/if}
