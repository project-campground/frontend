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
	import { defineMessages } from '@formatjs/svelte-intl';
	import { BonfireCreation } from '../../Modals/BonfireCreation/index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { fade, fly } from 'svelte/transition';
	import { CampsiteSettings } from '#lib/components/settings/index.js';
	import { PermissionFlag } from '#lib/util/constants.js';

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

	const locale = getLocale();
</script>

{#snippet bonfireCreationModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<BonfireCreation />
	</Modal>
{/snippet}
{#snippet campsiteSettingsModal(instance: MenuPortalInstance)}
	<CampsiteSettings {instance} />
{/snippet}

{#if open}
	<div
		class={['menu', { open }]}
		in:fly={{ duration: 200, y: -25 }}
		out:fade={{ duration: 200 }}
	>
		<Menu.List>
			<Menu.Group>
				<Menu.Button>
					<IconCampfireFilled />
					<LocaleMessage {...localeStrings.bonfires.settings} />
				</Menu.Button>
				<Menu.Button onclick={(ev) => menuPortal.add(campsiteSettingsModal, ev.currentTarget)}>
					<IconSettingsFilled />
					<LocaleMessage {...localeStrings.campsites.settings} />
				</Menu.Button>
				<Menu.Button
					color="danger"
					disabled={campsiteRef.userIsOwner}
					{@attach tooltip(menuPortal, locale.formatMessage(messages.leaveOwnerError))}
				>
					<IconLogout2 />
					<LocaleMessage {...messages.leave} />
				</Menu.Button>
			</Menu.Group>
			<Divider />
			<Menu.Group>
				{#each campsiteRef.campsite.bonfires as bonfire (bonfire.id)}
					<BonfireItem
						{bonfire}
						onClick={() => onBonfireOpen(bonfire.id)}
					/>
				{/each}
			</Menu.Group>
			<Menu.Group>
				{#if ((activeBonfire.rolePermissions ?? 0n) & PermissionFlag.ManageBonfires) === PermissionFlag.ManageBonfires}
					<Menu.Button onclick={(ev) => menuPortal.add(bonfireCreationModal, ev.currentTarget)}>
						<Group>
							<Avatar size="sm">
								<IconPlus />
							</Avatar>
							<LocaleMessage {...localeStrings.bonfires.create} />
						</Group>
					</Menu.Button>
				{/if}
			</Menu.Group>
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
