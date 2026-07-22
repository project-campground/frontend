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
		MenuPortal,
		MenuPortalContainer,
		PagePlaceholder,
		PagePlaceholderIcon,
		Portals,
		setMenuPortal,
	} from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { FormattedMessage } from '@campground/locale';

	const { children }: LayoutProps = $props();

	const accountContext = new AccountInfo(getSession());
	let error: Error | null = $state(null);

	$effect(() => {
		accountContext
			.init()
			.then(() => 0)
			.catch((err) => (error = err));
	});

	const menuPortal = new MenuPortal();

	setAccount(accountContext);
	setMenuPortal(menuPortal);
</script>

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
	<Portals>
		<MenuPortalContainer portal={menuPortal} />
	</Portals>
{/if}
