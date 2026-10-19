<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import { localeStrings } from '$lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled } from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import ProfilePage from './ProfilePage.svelte';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';

	type SettingsPage = 'profile';
	const pages: Record<SettingsPage, Settings.PageComponent> = { profile: ProfilePage };

	const campsiteContext = getCampsiteContext();
	const {
		instance,
		tent,
	}: Pick<Settings.RootProps<SettingsPage>, 'instance'> & { tent: TentViewBasic } = $props();
</script>

<Settings.Root
	defaultPage="profile"
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
				{campsiteContext.campsite?.name}
			{/snippet}
			<Settings.Button page="profile">
				<IconLayout2Filled size="1rem" />
				<LocaleMessage {...localeStrings.content.profile} />
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
