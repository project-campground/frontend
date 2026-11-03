<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import { localeStrings } from '#lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import ProfilePage from './ProfilePage.svelte';
	import PermissionsPage from './PermissionsPage.svelte';
	import DeletePage from './DeletePage.svelte';
	import type { BonfireViewBasic } from '#lib/types/campground/bonfires.js';

	type SettingsPage = 'profile' | 'permissions' | 'delete';
	const pages: Record<SettingsPage, Settings.PageComponent> = {
		delete: DeletePage,
		profile: ProfilePage,
		permissions: PermissionsPage,
	};

	const {
		instance,
		bonfire,
		defaultPage,
	}: Pick<Settings.RootProps<SettingsPage>, 'instance'> & {
		defaultPage?: SettingsPage;
		bonfire: BonfireViewBasic;
	} = $props();
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
			<Settings.Button
				page="delete"
				color="danger"
			>
				<IconTrashFilled size="1rem" />
				<LocaleMessage {...localeStrings.bonfires.delete} />
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
