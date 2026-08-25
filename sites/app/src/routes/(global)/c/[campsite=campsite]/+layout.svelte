<script lang="ts">
	import HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { setAppview } from '$lib/context/api.js';
	import { Card, loremIpsum, PagePlaceholder, PagePlaceholderIcon, Skeleton } from '@campground/ui';
	import type { LayoutProps } from './$types.ts';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { CampsiteContext, setCampsiteContext } from './context.svelte.ts';
	import BonfireBanner from './BonfireSidebar/BonfireBanner/Root.svelte';
	import BonfireContent from './BonfireSidebar/BonfireContent/Root.svelte';
	import FullPageTent from '../FullPageTent.svelte';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';

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
	<FullPageTent>...</FullPageTent>
{:else}
	<svelte:boundary>
		{#snippet pending()}
			<TentWrapper>
				{#snippet icon()}
					<Skeleton>
						<TentIcon
							type="text"
							viewType={0}
						/>
					</Skeleton>
				{/snippet}
				{#snippet title()}
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				{/snippet}
				...
			</TentWrapper>
			<FullPageTent>...</FullPageTent>
		{/snippet}
		{#snippet failed(err)}
			<FullPageTent>
				<PagePlaceholder icon={PagePlaceholderIcon.Error}>
					{#snippet title()}
						Error
					{/snippet}
					{err}
				</PagePlaceholder>
			</FullPageTent>
		{/snippet}
		{@render children()}
	</svelte:boundary>
{/if}
