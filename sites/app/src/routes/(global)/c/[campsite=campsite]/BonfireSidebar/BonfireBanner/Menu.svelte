<script
	lang="ts"
	module
>
	const messages = defineMessages({
		leave: {
			id: 'app.campsites.leave',
			defaultMessage: 'Leave the Campsite',
			description: 'The button for leaving the campsite',
		},
		leaveOwnerError: {
			id: 'app.campsites.leave.ownerError',
			defaultMessage: 'Campsite owners cannot leave. Try deleting the Campsite instead.',
			description:
				'The tooltip for leave campsite button for owners telling them they cannot leave the campsite',
		},
	});
</script>

<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import {
		Avatar,
		Divider,
		getMenuPortal,
		Group,
		Menu,
		Tooltip,
		tooltip,
		MenuPortalInstance,
		Modal,
	} from '@campground/ui';
	import {
		IconCampfireFilled,
		IconLogout2,
		IconPlus,
		IconSettingsFilled,
	} from '@tabler/icons-svelte';
	import { type BonfireContext, type CampsiteReference } from '../../context.svelte.ts';
	import BonfireItem from '../BonfireItem.svelte';
	import { GeneralPermissionConsts } from '$lib/util/permissions.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { BonfireCreation } from '../../Modals/BonfireCreation/index.ts';
	import { localeStrings } from '$lib/locale/index.js';

	const menuPortal = getMenuPortal();

	const {
		open,
		onBonfireOpen,
		campsite: campsiteRef,
		activeBonfire,
	}: {
		campsite: CampsiteReference;
		activeBonfire: BonfireContext;
		open: boolean;
		onBonfireOpen: (bonfireId: string) => unknown;
	} = $props();
</script>

{#snippet ownerErrorTooltip(instance: MenuPortalInstance)}
	<Tooltip {instance}>
		<LocaleMessage {...messages.leaveOwnerError} />
	</Tooltip>
{/snippet}
{#snippet bonfireCreationModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<BonfireCreation />
	</Modal>
{/snippet}

<div class={['menu', { open }]}>
	<Menu.List>
		<Menu.Item>
			<Menu.Button>
				<IconCampfireFilled />
				<LocaleMessage {...localeStrings.bonfires.settings} />
			</Menu.Button>
		</Menu.Item>
		<Menu.Item>
			<Menu.Button>
				<IconSettingsFilled />
				<LocaleMessage {...localeStrings.campsites.settings} />
			</Menu.Button>
		</Menu.Item>
		<Menu.Item>
			<Menu.Button
				color="danger"
				disabled={campsiteRef.userIsOwner}
				{@attach tooltip(menuPortal, ownerErrorTooltip)}
			>
				<IconLogout2 />
				<LocaleMessage {...messages.leave} />
			</Menu.Button>
		</Menu.Item>
		<Menu.Item
			size="lg"
			padding="no-inline"
		>
			<Divider />
		</Menu.Item>
		{#each campsiteRef.campsite.bonfires as bonfire (bonfire.id)}
			<BonfireItem
				{bonfire}
				onClick={() => onBonfireOpen(bonfire.id)}
			/>
		{/each}
		{#if ((activeBonfire.rolePermissions.general ?? 0) & GeneralPermissionConsts.MANAGE_BONFIRES) === GeneralPermissionConsts.MANAGE_BONFIRES}
			<Menu.Item>
				<Menu.Button onclick={(ev) => menuPortal.add(bonfireCreationModal, ev.currentTarget)}>
					<Group>
						<Avatar size="sm">
							<IconPlus />
						</Avatar>
						<LocaleMessage {...localeStrings.bonfires.create} />
					</Group>
				</Menu.Button>
			</Menu.Item>
		{/if}
	</Menu.List>
</div>

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
