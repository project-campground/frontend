<script lang="ts">
	import HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { setAppview } from '$lib/context/api.js';
	import { Card } from '@campground/ui';
	import type { LayoutProps } from './$types.ts';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { CampsiteContext, setCampsiteContext } from './context.svelte.ts';
	import BonfireBanner from './BonfireSidebar/BonfireBanner.svelte';
	import BonfireContent from './BonfireSidebar/BonfireContent.svelte';

	const { children, params }: LayoutProps = $props();
	const [campsiteId, domain] = $derived(params.campsite.split('@'));

	const session = getSession();
	const account = getAccount();

	const appview = new HTTPBackendClient(session, () => domain);
	const campsiteContext = new CampsiteContext(appview, session, account);

	setAppview(appview);
	setCampsiteContext(campsiteContext);

	const _ = $derived(await campsiteContext.init(domain, campsiteId));
	$effect(() => _);
</script>

<Card.Root
	level="subtle"
	size="xl"
>
	<Card.Overflow>
		<BonfireBanner />
		<BonfireContent />
	</Card.Overflow>
</Card.Root>

{#if !campsiteContext.campsite}
	...
{:else}
	<svelte:boundary>
		{#snippet pending()}
			Aaaaa
		{/snippet}
		{#snippet failed(err)}
			Failed: {err}
		{/snippet}
		{@render children()}
	</svelte:boundary>
{/if}
