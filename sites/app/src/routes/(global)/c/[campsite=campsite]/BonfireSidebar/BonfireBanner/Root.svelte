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
	const campsiteRef = $derived(campsiteContext.campsite);
	const activeBonfire = $derived(campsiteContext.openBonfire);
	const lastBonfireChar = $derived(
		$activeBonfire?.bonfireId.slice(-1)
			?? $campsiteRef?.campsite.bonfires[0].name.slice(-1)[0]
			?? 'a',
	);

	let menuOpen = $state(false);
	const outsideClick = getOutsideClickBoundary();

	async function setBonfire(bonfireId: string) {
		return campsiteContext.setActiveBonfire(bonfireId);
	}

	$effect(() => outsideClick.subscribe(() => (menuOpen = false)));
</script>

{#if $campsiteRef && $activeBonfire}
	<Layout onClick={(ev) => (ev.stopPropagation(), (menuOpen = !menuOpen))}>
		{#snippet banner()}
			<ProfileBanner
				id={lastBonfireChar}
				src={$activeBonfire.bonfire.bannerUri}
				aspectRatio={2.5}
			/>
		{/snippet}
		<ProfileAvatarWrapper>
			<ProfileAvatar
				size="sm"
				id={$activeBonfire.bonfire.id.slice(-1)}
				src={$activeBonfire.bonfire.avatarUri ?? undefined}
			>
				{$activeBonfire.bonfire.name[0].toUpperCase()}
			</ProfileAvatar>
		</ProfileAvatarWrapper>
		<Stack
			gap={0}
			flex={1}
		>
			<Para level="h4">
				{$activeBonfire.bonfire.name}
			</Para>
			<Para level="sub0">
				{$activeBonfire.bonfire.description}
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
		campsite={$campsiteRef}
		activeBonfire={$activeBonfire}
		open={menuOpen}
		onBonfireOpen={setBonfire}
	/>
{:else}
	<Skeleton />
{/if}
