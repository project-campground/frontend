<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import ProfilePage from './ProfilePage.svelte';
	import type { TentCategoryViewInList } from '#lib/types/campground/tent.js';
	import PermissionsPage from './PermissionsPage.svelte';
	import DeletePage from './DeletePage.svelte';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { getPermissions, hasPermission } from '#lib/util/permissions.js';
	import {
		PermissionsContext,
		setPermissionsContext,
	} from '../../../../routes/(global)/c/[campsite=campsite]/permissions.svelte.ts';
	import { PermissionFlag } from '#lib/util/constants.js';

	type SettingsPage = 'profile' | 'permissions' | 'delete';
	const pages: Record<SettingsPage, Settings.PageComponent> = {
		delete: DeletePage,
		profile: ProfilePage,
		permissions: PermissionsPage,
	};

	const {
		instance,
		tentCategory,
		defaultPage,
	}: Pick<Settings.RootProps<SettingsPage>, 'instance'> & {
		defaultPage?: SettingsPage;
		tentCategory: TentCategoryViewInList;
	} = $props();

	const campsiteContext = getCampsiteContext();
	const openBonfire = $derived(campsiteContext.openBonfire!);
	const categoryPermissions = $derived(
		campsiteContext.ownerPermissions ?? getPermissions(openBonfire.permissions, tentCategory),
	);

	const permissionsContext = new PermissionsContext();
	setPermissionsContext(permissionsContext);

	$effect(() => {
		permissionsContext.permissions = categoryPermissions;
	});
</script>

<Settings.Root
	defaultPage={defaultPage ?? 'profile'}
	value={tentCategory}
	{pages}
	{instance}
>
	{#snippet header()}
		<LocaleMessage {...localeStrings.tentCategories.settings} />
	{/snippet}
	{#snippet sidebar()}
		<Settings.Category>
			{#snippet header()}
				{tentCategory.name}
			{/snippet}
			<Settings.Button page="profile">
				<IconLayout2Filled size="1rem" />
				<LocaleMessage {...localeStrings.content.profile} />
			</Settings.Button>
			{#if hasPermission(categoryPermissions, PermissionFlag.ManageTents)}
				<Settings.Button
					page="delete"
					color="danger"
				>
					<IconTrashFilled size="1rem" />
					<LocaleMessage {...localeStrings.tentCategories.delete} />
				</Settings.Button>
			{/if}
		</Settings.Category>
		{#if hasPermission(categoryPermissions, PermissionFlag.ManageRoles)}
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
