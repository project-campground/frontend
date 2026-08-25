<script lang="ts">
	import ProfileBanner from '$lib/components/pages/ProfileBanner.svelte';
	import {
		Para,
		Stack,
		Button,
		Menu,
		getOutsideClickBoundary,
		Divider,
		Group,
		Avatar,
	} from '@campground/ui';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import ProfileAvatarWrapper from '$lib/components/pages/ProfileAvatarWrapper.svelte';
	import ProfileAvatar from '$lib/components/pages/ProfileAvatar.svelte';
	import {
		IconCampfireFilled,
		IconDotsFilled,
		IconLogout2,
		IconPlus,
		IconSettingsFilled,
	} from '@tabler/icons-svelte';
	import Layout from './Layout.svelte';
	import Skeleton from './Skeleton.svelte';
	import { GeneralPermissionConsts } from '$lib/util/permissions.js';
	import { FormattedMessageGlobal } from '@campground/locale';
	import BonfireItem from '../BonfireItem.svelte';

	const campsiteContext = getCampsiteContext();
	const currentBonfire = $derived(campsiteContext.tents?.bonfire);
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
		<Button
			size="sm"
			color="neutral"
			padding="equal"
			variant="plain"
		>
			<IconDotsFilled size="1.5rem" />
		</Button>
	</Layout>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={['menu', { open: menuOpen }]}>
		<Menu.List>
			<Menu.Item>
				<Menu.Button>
					<IconCampfireFilled />
					<FormattedMessageGlobal id="app.bonfires.settings" />
				</Menu.Button>
			</Menu.Item>
			<Menu.Item>
				<Menu.Button>
					<IconSettingsFilled />
					<FormattedMessageGlobal id="app.campsites.settings" />
				</Menu.Button>
			</Menu.Item>
			{#if !campsiteContext.userIsOwner}
				<Menu.Item>
					<Menu.Button color="danger">
						<IconLogout2 />
						...
					</Menu.Button>
				</Menu.Item>
			{/if}
			<Menu.Item
				size="lg"
				padding="no-inline"
			>
				<Divider />
			</Menu.Item>
			{#each campsiteContext.campsite?.bonfires as bonfire (bonfire.id)}
				<BonfireItem
					{bonfire}
					onClick={() => setBonfire(bonfire.id)}
				/>
			{/each}
			{#if ((campsiteContext.tents?.rolePermissions.general ?? 0) & GeneralPermissionConsts.MANAGE_BONFIRES) === GeneralPermissionConsts.MANAGE_BONFIRES}
				<Menu.Item>
					<Menu.Button>
						<Group>
							<Avatar size="sm">
								<IconPlus />
							</Avatar>
							<FormattedMessageGlobal id="app.bonfires.create" />
						</Group>
					</Menu.Button>
				</Menu.Item>
			{/if}
		</Menu.List>
	</div>
{:else}
	<Skeleton />
{/if}

<style lang="scss">
	.menu {
		position: absolute;

		top: 9.5rem;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		z-index: 5;

		display: none;
		&.open {
			display: block;
		}
	}
</style>
