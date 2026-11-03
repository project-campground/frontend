<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import ProfilePage from './ProfilePage.svelte';
	import type { TentViewBasic } from '#lib/types/campground/tent.js';
	import PermissionsPage from './PermissionsPage.svelte';
	import DeletePage from './DeletePage.svelte';

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
		tent: TentViewBasic;
	} = $props();
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
			<Settings.Button
				page="delete"
				color="danger"
			>
				<IconTrashFilled size="1rem" />
				<LocaleMessage {...localeStrings.tents.delete} />
			</Settings.Button>
		</Settings.Category>
		<Settings.Category>
			{#snippet header()}
				<LocaleMessage {...localeStrings.members.members} />
			{/snippet}
			<Settings.Button page="permissions">
				<IconShieldFilled size="1rem" />
				<LocaleMessage {...localeStrings.permissions.permissions} />
			</Settings.Button>
		</Settings.Category>
	{/snippet}
</Settings.Root>
