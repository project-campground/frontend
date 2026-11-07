<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import ProfilePage from './ProfilePage.svelte';
	import type { TentViewInList } from '#lib/types/campground/tent.js';
	import PermissionsPage from './PermissionsPage.svelte';
	import DeletePage from './DeletePage.svelte';
	import {
		PermissionsContext,
		setPermissionsContext,
	} from '../../../../routes/(global)/c/[campsite=campsite]/permissions.svelte.ts';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getPermissions, hasPermission } from '#lib/util/permissions.js';
	import { PermissionFlag } from '#lib/util/constants.js';

	type SettingsPage = 'profile' | 'permissions' | 'delete';
	const pages: Record<SettingsPage, Settings.PageComponent> = {
		delete: DeletePage,
		profile: ProfilePage,
		permissions: PermissionsPage,
	};

	const {
		instance,
		tent,
		defaultPage,
	}: Pick<Settings.RootProps<SettingsPage>, 'instance'> & {
		defaultPage?: SettingsPage;
		tent: TentViewInList;
	} = $props();

	const campsiteContext = getCampsiteContext();
	const openBonfire = $derived(campsiteContext.openBonfire!);
	const category = $derived(openBonfire.categories.find((x) => x.id === tent.categoryId));
	const tentPermissions = $derived(
		campsiteContext.ownerPermissions
			?? getPermissions(
				category ? getPermissions(openBonfire.permissions, category) : openBonfire.permissions,
				tent,
			),
	);

	const permissionsContext = new PermissionsContext();
	setPermissionsContext(permissionsContext);

	$effect(() => {
		permissionsContext.permissions = tentPermissions;
	});
</script>

<Settings.Root
	defaultPage={defaultPage ?? 'profile'}
	value={tent}
	{pages}
	{instance}
>
	{#snippet header()}
		<LocaleMessage {...localeStrings.tents.settings} />
	{/snippet}
	{#snippet sidebar()}
		<Settings.Category>
			{#snippet header()}
				{tent.name}
			{/snippet}
			<Settings.Button page="profile">
				<IconLayout2Filled size="1rem" />
				<LocaleMessage {...localeStrings.content.profile} />
			</Settings.Button>
			{#if hasPermission(tentPermissions, PermissionFlag.ManageTents)}
				<Settings.Button
					page="delete"
					color="danger"
				>
					<IconTrashFilled size="1rem" />
					<LocaleMessage {...localeStrings.tents.delete} />
				</Settings.Button>
			{/if}
		</Settings.Category>
		{#if hasPermission(tentPermissions, PermissionFlag.ManageRoles)}
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
