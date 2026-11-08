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
	import { getLocale, LocaleMessage } from '@campground/locale';
	import {
		Avatar,
		Divider,
		getMenuPortal,
		Group,
		Menu,
		tooltip,
		MenuPortalInstance,
		Modal,
	} from '@campground/ui';
	import {
		IconCampfireFilled,
		IconLogout2,
		IconPlus,
		IconSettingsFilled,
		IconTicketFilled,
	} from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import BonfireItem from '../BonfireItem.svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { BonfireCreation } from '../../Modals/BonfireCreation/index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { fade, fly } from 'svelte/transition';
	import { BonfireSettings, CampsiteSettings } from '#lib/components/settings/index.js';
	import { PermissionFlag } from '#lib/util/constants.js';
	import { InviteCreation } from '../../Modals/InviteCreation/index.ts';
	import LeaveCampsite from '../../Modals/LeaveCampsite.svelte';
	import { hasAnyPermission, hasPermission } from '#lib/util/permissions.js';

	const menuPortal = getMenuPortal();
	const campsiteContext = getCampsiteContext();
	const activeBonfire = $derived(campsiteContext.openBonfire);
	const isOwner = $derived(campsiteContext.userIsOwner);
	const campsitePermissions = $derived(campsiteContext.permissions);
	const bonfirePermissions = $derived(activeBonfire?.permissions ?? campsitePermissions);

	const { open, onBonfireOpen }: { open: boolean; onBonfireOpen: (bonfireId: string) => unknown } =
		$props();

	const locale = getLocale();
</script>

{#snippet leaveCampsite(instance: MenuPortalInstance)}
	<Modal {instance}>
		<LeaveCampsite />
	</Modal>
{/snippet}
{#snippet inviteCreationModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<InviteCreation />
	</Modal>
{/snippet}
{#snippet bonfireCreationModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<BonfireCreation />
	</Modal>
{/snippet}
{#snippet campsiteSettingsModal(instance: MenuPortalInstance)}
	<CampsiteSettings {instance} />
{/snippet}
{#snippet bonfireSettingsModal(instance: MenuPortalInstance)}
	<BonfireSettings
		{instance}
		bonfire={activeBonfire!.bonfire}
	/>
{/snippet}

{#if open}
	<div
		class={['menu', { open }]}
		in:fly={{ duration: 200, y: -25 }}
		out:fade={{ duration: 200 }}
	>
		<Menu.List>
			<Menu.Group>
				{#if isOwner || hasAnyPermission(campsitePermissions, PermissionFlag.ManageRoles | PermissionFlag.ManageCampsite | PermissionFlag.BanMembers)}
					<Menu.Button onclick={(ev) => menuPortal.add(campsiteSettingsModal, ev.currentTarget)}>
						<IconSettingsFilled />
						<LocaleMessage {...localeStrings.campsites.settings} />
					</Menu.Button>
				{/if}
				{#if isOwner || hasAnyPermission(bonfirePermissions, PermissionFlag.ManageRoles | PermissionFlag.ManageBonfires)}
					<Menu.Button onclick={(ev) => menuPortal.add(bonfireSettingsModal, ev.currentTarget)}>
						<IconCampfireFilled />
						<LocaleMessage {...localeStrings.bonfires.settings} />
					</Menu.Button>
				{/if}
				{#if isOwner || hasPermission(campsitePermissions, PermissionFlag.CreateInvites)}
					<Menu.Button onclick={(ev) => menuPortal.add(inviteCreationModal, ev.currentTarget)}>
						<IconTicketFilled />
						<LocaleMessage {...localeStrings.invites.create} />
					</Menu.Button>
				{/if}
				<Menu.Button
					color="danger"
					disabled={isOwner}
					onclick={(ev) => menuPortal.add(leaveCampsite, ev.currentTarget)}
					{@attach tooltip(menuPortal, locale.formatMessage(messages.leaveOwnerError))}
				>
					<IconLogout2 />
					<LocaleMessage {...messages.leave} />
				</Menu.Button>
			</Menu.Group>
			<Divider />
			<Menu.Group>
				{#each campsiteContext.bonfires as bonfire (bonfire.id)}
					<BonfireItem
						{bonfire}
						onClick={() => onBonfireOpen(bonfire.id)}
					/>
				{/each}
			</Menu.Group>
			{#if isOwner || hasAnyPermission(campsitePermissions, PermissionFlag.ManageBonfires)}
				<Menu.Group>
					<Menu.Button onclick={(ev) => menuPortal.add(bonfireCreationModal, ev.currentTarget)}>
						<Group>
							<Avatar size="sm">
								<IconPlus />
							</Avatar>
							<LocaleMessage {...localeStrings.bonfires.create} />
						</Group>
					</Menu.Button>
				</Menu.Group>
			{/if}
		</Menu.List>
	</div>
{/if}

<style lang="scss">
	.menu {
		position: absolute;

		top: 9.5rem;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		z-index: 5;
	}
</style>
