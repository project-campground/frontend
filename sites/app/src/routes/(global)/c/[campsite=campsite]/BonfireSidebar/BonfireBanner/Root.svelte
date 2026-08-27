<script lang="ts">
	import ProfileBanner from '$lib/components/pages/ProfileBanner.svelte';
	import { Para, Stack, Button, getOutsideClickBoundary } from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import ProfileAvatarWrapper from '$lib/components/pages/ProfileAvatarWrapper.svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import { IconDotsFilled } from '@tabler/icons-svelte';
	import Layout from './Layout.svelte';
	import Skeleton from './Skeleton.svelte';
	import BonfireList from './Menu.svelte';

	const campsiteContext = getCampsiteContext();
	const currentBonfire = $derived(campsiteContext.tents?.bonfire);
	const lastBonfireChar = $derived(campsiteContext.tents?.bonfireId.slice(-1) ?? 'a');
	let menuOpen = $state(false);
	const outsideClick = getOutsideClickBoundary();

	async function setBonfire(bonfireId: string) {
		return campsiteContext.setOpenBonfire(bonfireId);
	}

	$effect(() => outsideClick.subscribe(() => (menuOpen = false)));
</script>

{#if currentBonfire}
	<Layout onClick={(ev) => (ev.stopPropagation(), (menuOpen = !menuOpen))}>
		{#snippet banner()}
			<ProfileBanner
				id={lastBonfireChar}
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
		<Button
			size="sm"
			color="neutral"
			padding="equal"
			variant="plain"
		>
			<IconDotsFilled size="1.5rem" />
		</Button>
	</Layout>
	<BonfireList
		open={menuOpen}
		onBonfireOpen={setBonfire}
	/>
{:else}
	<Skeleton />
{/if}
