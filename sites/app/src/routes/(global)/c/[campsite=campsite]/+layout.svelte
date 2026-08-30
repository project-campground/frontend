<script lang="ts">
	import HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { setAppview } from '$lib/context/api.js';
	import {
		loremIpsum,
		MenuPortal,
		MenuPortalContainer,
		PagePlaceholder,
		PagePlaceholderIcon,
		Portals,
		setMenuPortal,
		Skeleton,
	} from '@campground/ui';
	import type { LayoutProps } from './$types.ts';
	import {
		BonfireContext,
		CampsiteContext,
		CampsiteReference,
		setCampsiteContext,
	} from './context.svelte.ts';
	import FullPageTent from '../FullPageTent.svelte';
	import TentWrapper from './TentWrapper.svelte';
	import TentIcon from '$lib/components/tents/TentIcon.svelte';
	import Sidebar from './BonfireSidebar/Sidebar.svelte';
	import { writable } from 'svelte/store';

	const { children, params }: LayoutProps = $props();
	const [campsiteId, domain] = $derived(params.campsite.split('@'));

	const session = getSession();

	const appview = new HTTPBackendClient(session, () => domain);
	setAppview(appview);

	const menuPortal = new MenuPortal();
	setMenuPortal(menuPortal);

	async function setBonfire(bonfireId: string) {
		if ($activeBonfire?.bonfireId === bonfireId) return;

		const tents = await appview.tents.getMany(campsiteId, bonfireId);
		$activeBonfire = new BonfireContext(bonfireId, $campsite!, tents);
	}
	const campsite = writable<CampsiteReference | null>(null);
	const activeBonfire = writable<BonfireContext | null>(null);
	const campsiteContext = new CampsiteContext(campsite, activeBonfire, setBonfire);
	setCampsiteContext(campsiteContext);

	$effect(() => {
		// Make sure there is nothing trying to find bonfire that does not exist
		$activeBonfire = null;
		$campsite = null;
		appview.campsites
			.get(campsiteId)
			.then((value) => ($campsite = new CampsiteReference(domain, campsiteId, value)));
	});
</script>

<Sidebar />

{#if !$campsite}
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
					{console.error(err)}
				</PagePlaceholder>
			</FullPageTent>
		{/snippet}
		{@render children()}
	</svelte:boundary>
{/if}

<Portals.List>
	<MenuPortalContainer portal={menuPortal} />
</Portals.List>
