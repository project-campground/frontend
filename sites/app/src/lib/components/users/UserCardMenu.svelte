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
	import { Link, Menu, Para } from '@campground/ui';
	import UserHeader from './UserHeader.svelte';
	import type { ProfileViewBasic } from '$lib/types/campground/user.js';
	import {
		IconLogout2,
		IconSettingsFilled,
		IconShieldFilled,
		IconUserFilled,
	} from '@tabler/icons-svelte';
	import { FormattedMessage, FormattedMessageGlobal } from '@campground/locale';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getAccount } from '$lib/context/account.svelte.js';

	interface Props {
		hideButtons?: boolean;
		user: ProfileViewBasic;
	}

	const session = getAccount();
	const currentUserDid = session.sessionInfo?.did ?? null;

	const { hideButtons, user }: Props = $props();
</script>

<Menu.List>
	<div class={['container', { hideButtons }]}>
		<UserHeader
			did={user.did}
			avatar={user.avatar}
			banner={user.banner}
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
		<div class="buttons">
			<Menu.Item>
				<Link
					fullWidth
					underlined="never"
					href={`/profile/${user.did}`}
				>
					<Menu.Button>
						{#snippet left()}
							<IconUserFilled />
						{/snippet}
						<FormattedMessage {...localeMessages.viewProfile} />
					</Menu.Button>
				</Link>
			</Menu.Item>
			{#if currentUserDid === user.did}
				<Menu.Item>
					<Menu.Button>
						{#snippet left()}
							<IconSettingsFilled />
						{/snippet}
						<FormattedMessage {...localeMessages.openSettings} />
					</Menu.Button>
				</Menu.Item>
				<Menu.Item color="danger">
					<Menu.Button>
						{#snippet left()}
							<IconLogout2 />
						{/snippet}
						<FormattedMessageGlobal id="form.logout" />
					</Menu.Button>
				</Menu.Item>
			{:else}
				<Menu.Item>
					<Menu.Button>
						{#snippet left()}
							<IconSettingsFilled />
						{/snippet}
						<FormattedMessage {...localeMessages.openSettings} />
					</Menu.Button>
				</Menu.Item>
				<Menu.Item color="danger">
					<Menu.Button>
						{#snippet left()}
							<IconShieldFilled />
						{/snippet}
						<FormattedMessage {...localeMessages.blockUser} />
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
		border-radius: var(--radius-md);
		margin: 0 0.5rem;
		padding: 0.25rem;
		margin-top: 1rem;
		.hideButtons & {
			display: none;
		}
	}
</style>
