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
	import { Session, setSession } from '#lib/context/session/context.svelte.js';
	import type { LayoutProps } from './$types.js';
	import GlobalLayout from './GlobalLayout.svelte';
	import { getAuth } from '#lib/context/auth/context.svelte.js';
	import {
		Dialog,
		MenuPortal,
		MenuPortalContainer,
		Modal,
		Portals,
		setMenuPortal,
		type MenuPortalInstance,
	} from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import ProfileSetup from './GettingStartedModal.svelte';
	import { onMount } from 'svelte';
	import { setAppview } from '#lib/context/api.js';
	import HTTPBackendClient from '#lib/api/http/HTTPBackendClient.js';
	import { defaultAppview } from '#lib/api/api.config.js';
	import ErrorPlaceholder from '#lib/components/ErrorPlaceholder.svelte';

	const { children }: LayoutProps = $props();

	const auth = getAuth();
	const session = new Session(auth);
	let error: Error | null = $state(null);

	onMount(() => {
		session
			.init()
			.then((accountInfo) => {
				if (accountInfo.profile === null)
					menuPortal.add(createProfileModal, document.getElementById('main')!);
			})
			.catch((err) => (error = err));
	});

	const menuPortal = new MenuPortal();
	const defaultAppviewDomain = defaultAppview.url.split('//')[1];

	setAppview(new HTTPBackendClient(auth, () => defaultAppviewDomain));
	setSession(session);
	setMenuPortal(menuPortal);
</script>

{#snippet createProfileModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<Dialog.Root size="full">
			<ProfileSetup />
		</Dialog.Root>
	</Modal>
{/snippet}

{#if error}
	<ErrorPlaceholder {error} />
{:else}
	<GlobalLayout>
		{@render children()}
	</GlobalLayout>
	<Portals.List>
		<MenuPortalContainer portal={menuPortal} />
	</Portals.List>
{/if}
