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
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
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
	import { getCampsiteContext } from '../../context.svelte.ts';
	import BonfireItem from '../BonfireItem.svelte';
	import { GeneralPermissionConsts } from '$lib/util/permissions.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { BonfireCreation } from '../../Modals/BonfireCreation/index.ts';

	const campsiteContext = getCampsiteContext();
	const menuPortal = getMenuPortal();

	const { open, onBonfireOpen }: { open: boolean; onBonfireOpen: (bonfireId: string) => unknown } =
		$props();
</script>

{#snippet ownerErrorTooltip(instance: MenuPortalInstance)}
	<Tooltip {instance}>
		<FormattedMessage {...messages.leaveOwnerError} />
	</Tooltip>
{/snippet}
{#snippet bonfireCreationModal(instance: MenuPortalInstance)}
	<Modal.Root {instance}>
		<BonfireCreation />
	</Modal.Root>
{/snippet}

<div class={['menu', { open }]}>
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
		<Menu.Item>
			<Menu.Button
				color="danger"
				disabled={campsiteContext.userIsOwner}
				{@attach tooltip(menuPortal, ownerErrorTooltip)}
			>
				<IconLogout2 />
				<FormattedMessage {...messages.leave} />
			</Menu.Button>
		</Menu.Item>
		<Menu.Item
			size="lg"
			padding="no-inline"
		>
			<Divider />
		</Menu.Item>
		{#each campsiteContext.campsite?.bonfires as bonfire (bonfire.id)}
			<BonfireItem
				{bonfire}
				onClick={() => onBonfireOpen(bonfire.id)}
			/>
		{/each}
		{#if ((campsiteContext.tents?.rolePermissions.general ?? 0) & GeneralPermissionConsts.MANAGE_BONFIRES) === GeneralPermissionConsts.MANAGE_BONFIRES}
			<Menu.Item>
				<Menu.Button onclick={(ev) => menuPortal.add(bonfireCreationModal, ev.currentTarget)}>
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
