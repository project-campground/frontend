<script
	lang="ts"
	module
>
	const localeMessages = defineMessages({
		viewProfile: {
			id: 'app.actors.viewProfile',
			defaultMessage: 'View profile',
			description: "Menu button for viewing user's profile",
		},
		openSettings: {
			id: 'app.settings',
			defaultMessage: 'Settings',
			description: 'Menu button for settings, as well as settings title',
		},
		blockUser: {
			id: 'app.actors.block',
			defaultMessage: 'Block',
			description: 'Menu button for blocking the user',
		},
		addFriend: {
			id: 'app.actors.addFriend',
			defaultMessage: 'Add friend',
			description: 'Menu button for adding user as a friend',
		},
	});
</script>

<script lang="ts">
	import { Accordion, Group, Link, Menu, Para } from '@campground/ui';
	import UserHeader from './Header.svelte';
	import type { ProfileViewBasic } from '$lib/types/campground/user.js';
	import {
		IconLogout2,
		IconSettingsFilled,
		IconShieldFilled,
		IconUserFilled,
	} from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { localeStrings } from '$lib/locale/index.js';
	import type { MemberViewBasic, MemberViewDetailed } from '$lib/types/campground/membership.js';
	import {
		getCampsiteContext,
		hasCampsiteContext,
	} from '../../../../routes/(global)/c/[campsite=campsite]/context.svelte.ts';
	import { Role } from '$lib/components/campsite/index.js';
	import { getAppview } from '$lib/context/api.js';
	import { toLookup } from '$lib/util/array.js';
	import type { RoleView } from '$lib/types/campground/roles.js';
	import { RoleFlag } from '$lib/util/constants.ts';

	interface Props {
		hideButtons?: boolean;
		user: ProfileViewBasic;
		member?: Partial<Omit<MemberViewDetailed, 'user'>> & Omit<MemberViewBasic, 'user'>;
	}

	const appview = getAppview();

	async function removeRole(roleId: string) {
		if (!campsiteContext?.campsite)
			return;

		return appview.members.removeRole(campsiteContext.campsite.id, roleId, { memberIds: [user.did] });
	}
	async function addRole(roleId: string) {
		if (!campsiteContext?.campsite)
			return;

		return appview.members.addRole(campsiteContext.campsite.id, roleId, { memberIds: [user.did] });
	}

	const session = getAccount();
	const currentUserDid = session.sessionInfo?.did ?? null;
	const inCampsiteContext = hasCampsiteContext();
	const campsiteContext = inCampsiteContext ? getCampsiteContext() : null;

	const { hideButtons, user, member }: Props = $props();
</script>

<Menu.List size="xl">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={['container', { hideButtons }]} onclick={(ev) => ev.stopPropagation()}>
		<UserHeader
			did={user.did}
			avatar={user.avatar}
			banner={user.banner}
			status={user.status}
		/>
		<div class="content">
			<div class="username">
				<Para level="h2">
					{user.displayName ?? user.handle}
				</Para>
				<Para level="sub0">
					@{user.handle}
				</Para>
				{#if user.tagline}
					<Para>
						{user.tagline}
					</Para>
				{/if}
			</div>
		</div>
		{#if member && inCampsiteContext}
		<div class="sections">
				{const memberRoles = toLookup<RoleView, 0 | 1>(campsiteContext!.roles ?? [], (x) => Number(member.roles.includes(x.id)) as 0 | 1)}
				<Accordion
					expanded
					noBackground
				>
					{#snippet header()}
						<LocaleMessage {...localeStrings.roles.roles} />
					{/snippet}
					<Group gap={0.5}>
						{#each memberRoles[1] as role (role.id)}
							<Role.Display {role} onRemove={(role.flags & RoleFlag.Default) === RoleFlag.Default ? undefined : removeRole.bind(null, role.id)} />
						{/each}
						<Role.Adder roles={memberRoles[0]} onAdd={addRole} />
					</Group>
				</Accordion>
			</div>
		{/if}
		<div class="buttons">
			<Menu.Item>
				<Link
					fullWidth
					underlined="never"
					href={`/profile/${user.did}`}
				>
					<Menu.Button>
						<IconUserFilled />
						<LocaleMessage {...localeMessages.viewProfile} />
					</Menu.Button>
				</Link>
			</Menu.Item>
			{#if currentUserDid === user.did}
				<Menu.Item>
					<Menu.Button>
						<IconSettingsFilled />
						<LocaleMessage {...localeMessages.openSettings} />
					</Menu.Button>
				</Menu.Item>
				<Menu.Item>
					<Menu.Button color="danger">
						<IconLogout2 />
						<LocaleMessage {...localeStrings.session.logout} />
					</Menu.Button>
				</Menu.Item>
			{:else}
				<Menu.Item>
					<Menu.Button>
						<IconSettingsFilled />
						<LocaleMessage {...localeMessages.openSettings} />
					</Menu.Button>
				</Menu.Item>
				<Menu.Item>
					<Menu.Button color="danger">
						<IconShieldFilled />
						<LocaleMessage {...localeMessages.blockUser} />
					</Menu.Button>
				</Menu.Item>
			{/if}
		</div>
	</div>
</Menu.List>

<style lang="scss">
	.content {
		padding: 0 0.5rem;
	}
	.buttons {
		background-color: var(--background-body);
		border-radius: var(--radius-xl);
		margin: 0 0.5rem;
		padding: 0.25rem;
		margin-top: 1rem;
		.hideButtons & {
			display: none;
		}
	}
	.sections {
		margin-block: 0.5rem;
		padding-inline: 0.5rem;
	}
</style>
