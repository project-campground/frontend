<script
	lang="ts"
	module
>
	const errors = defineMessages({
		sessionError: {
			id: 'app.session.error',
			defaultMessage: 'Unexpected error when fetching the session',
			description: `The title of the error when fetching a session and failing in the app.`,
		},
	});
</script>

<script lang="ts">
	import { AccountInfo, setAccount } from '$lib/context/account.svelte';
	import type { LayoutProps } from './$types.js';
	import GlobalLayout from './GlobalLayout.svelte';
	import { getSession } from '$lib/api/session/Session.svelte';
	import {
		Dialog,
		MenuPortal,
		MenuPortalContainer,
		Modal,
		PagePlaceholder,
		PagePlaceholderIcon,
		Portals,
		setMenuPortal,
		type MenuPortalInstance,
	} from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { FormattedMessage } from '@campground/locale';
	import ProfileSetup from './GettingStartedModal.svelte';
	import { onMount } from 'svelte';
	import { setAppview } from '$lib/context/api.js';
	import HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';
	import { defaultAppview } from '$lib/api/api.config.js';

	const { children }: LayoutProps = $props();

	const session = getSession();
	const accountContext = new AccountInfo(session);
	let error: Error | null = $state(null);

	onMount(() => {
		accountContext
			.init()
			.then((accountInfo) => {
				if (accountInfo.profile === null)
					menuPortal.add(createProfileModal, document.getElementById('main')!);
			})
			.catch((err) => (error = err));
	});

	const menuPortal = new MenuPortal();
	const defaultAppviewDomain = defaultAppview.url.split('//')[1];

	setAppview(new HTTPBackendClient(session, () => defaultAppviewDomain));
	setAccount(accountContext);
	setMenuPortal(menuPortal);
</script>

{#snippet createProfileModal(instance: MenuPortalInstance)}
	<Modal.Root {instance}>
		<Dialog.Root size="full">
			<ProfileSetup />
		</Dialog.Root>
	</Modal.Root>
{/snippet}

{#if error}
	<PagePlaceholder icon={PagePlaceholderIcon.Error}>
		{#snippet title()}
			<FormattedMessage {...errors.sessionError} />
		{/snippet}
		{error}
	</PagePlaceholder>
{:else}
	<GlobalLayout>
		{@render children()}
	</GlobalLayout>
	<Portals.List>
		<MenuPortalContainer portal={menuPortal} />
	</Portals.List>
{/if}
