<script lang="ts">
	import { LocaleMessage } from '@campground/locale';
	import { Settings } from '../index.ts';
	import ProfilePage from './ProfilePage.svelte';
	import { localeStrings } from '#lib/locale/index.js';
	import {
		IconBadgeFilled,
		IconLayout2Filled,
		IconShieldFilled,
		IconTicketFilled,
	} from '@tabler/icons-svelte';
	import { getCampsiteContext } from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import RolesPage from './CampsiteSettingsRole/Page.svelte';
	import InvitesPage from './InvitesPage.svelte';
	import BansPage from './BansPage.svelte';
	import { PermissionFlag } from '#lib/util/constants.js';
	import { hasAnyPermission, hasPermission } from '#lib/util/permissions.js';

	type SettingsPage = 'profile' | 'memberBans' | 'invites' | 'roles';
	const pages: Record<SettingsPage, Settings.PageComponent> = {
		profile: ProfilePage,
		memberBans: BansPage,
		invites: InvitesPage,
		roles: RolesPage,
	};

	const campsiteContext = getCampsiteContext();
	const { instance }: Pick<Settings.RootProps<SettingsPage>, 'instance'> = $props();
	const campsitePermissions = $derived(campsiteContext.permissions);
</script>

<Settings.Root
	defaultPage="profile"
	value={campsiteContext}
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
		{#if hasAnyPermission(campsitePermissions, PermissionFlag.BanMembers | PermissionFlag.ManageInvites | PermissionFlag.ManageRoles)}
			<Settings.Category>
				{#snippet header()}
					<LocaleMessage {...localeStrings.members.members} />
				{/snippet}
				{#if hasPermission(campsitePermissions, PermissionFlag.BanMembers)}
					<Settings.Button page="memberBans">
						<IconShieldFilled size="1rem" />
						<LocaleMessage {...localeStrings.memberBans.memberBans} />
					</Settings.Button>
				{/if}
				{#if hasPermission(campsitePermissions, PermissionFlag.ManageInvites)}
					<Settings.Button page="invites">
						<IconTicketFilled size="1rem" />
						<LocaleMessage {...localeStrings.invites.invites} />
					</Settings.Button>
				{/if}
				{#if hasPermission(campsitePermissions, PermissionFlag.ManageRoles)}
					<Settings.Button page="roles">
						<IconBadgeFilled size="1rem" />
						<LocaleMessage {...localeStrings.roles.roles} />
					</Settings.Button>
				{/if}
			</Settings.Category>
		{/if}
	{/snippet}
</Settings.Root>
