<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import ProfilePage from './ProfilePage.svelte';
	import { localeStrings } from '$lib/locale/index.js';
	import { IconLayout2Filled, IconShieldFilled } from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';

	type SettingsPage = 'profile' | 'memberBans';
	const pages: Record<SettingsPage, Settings.PageComponent> = {
		profile: ProfilePage,
		memberBans: ProfilePage,
	};

	const campsiteContext = getCampsiteContext();
	const { instance }: Pick<Settings.RootProps<SettingsPage>, 'instance'> = $props();
</script>

<Settings.Root
	defaultPage="profile"
	{pages}
	{instance}
>
	{#snippet header()}
		<LocaleMessage {...localeStrings.campsites.settings} />
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
			<Settings.Button page="memberBans">
				<IconShieldFilled size="1rem" />
				<LocaleMessage {...localeStrings.memberBans.memberBans} />
			</Settings.Button>
		</Settings.Category>
	{/snippet}
</Settings.Root>
