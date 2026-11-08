<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import ProfilePage from './ProfilePage.svelte';
	import PermissionsPage from './PermissionsPage.svelte';
	import DeletePage from './DeletePage.svelte';
	import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';
	import { getPermissions, hasPermission } from '#lib/util/permissions.js';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { PermissionFlag } from '#lib/util/constants.js';

	type SettingsPage = 'profile' | 'permissions' | 'delete';
	const pages: Record<SettingsPage, Settings.PageComponent> = {
		delete: DeletePage,
		profile: ProfilePage,
		permissions: PermissionsPage,
	};

	const campsiteContext = getCampsiteContext();

	const {
		instance,
		bonfire,
		defaultPage,
	}: Pick<Settings.RootProps<SettingsPage>, 'instance'> & {
		defaultPage?: SettingsPage;
		bonfire: BonfireViewInList;
	} = $props();

	const permissions = $derived(
		campsiteContext.ownerPermissions ?? getPermissions(campsiteContext.permissions, bonfire),
	);
</script>

<Settings.Root
	defaultPage={defaultPage ?? 'profile'}
	value={bonfire}
	{pages}
	{instance}
>
	{#snippet header()}
		<LocaleMessage {...localeStrings.bonfires.settings} />
	{/snippet}
	{#snippet sidebar()}
		<Settings.Category>
			{#snippet header()}
				{bonfire.name}
			{/snippet}
			<Settings.Button page="profile">
				<IconLayout2Filled size="1rem" />
				<LocaleMessage {...localeStrings.content.profile} />
			</Settings.Button>
			{#if hasPermission(permissions, PermissionFlag.ManageBonfires)}
				<Settings.Button
					page="delete"
					color="danger"
				>
					<IconTrashFilled size="1rem" />
					<LocaleMessage {...localeStrings.bonfires.delete} />
				</Settings.Button>
			{/if}
		</Settings.Category>
		{#if hasPermission(permissions, PermissionFlag.ManageRoles)}
			<Settings.Category>
				{#snippet header()}
					<LocaleMessage {...localeStrings.members.members} />
				{/snippet}
				<Settings.Button page="permissions">
					<IconShieldFilled size="1rem" />
					<LocaleMessage {...localeStrings.permissions.permissions} />
				</Settings.Button>
			</Settings.Category>
		{/if}
	{/snippet}
</Settings.Root>
