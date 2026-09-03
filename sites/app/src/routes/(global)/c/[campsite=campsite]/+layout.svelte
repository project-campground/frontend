<script lang="ts">
	import HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { setAppview } from '$lib/context/api.js';
	import { MenuPortal, MenuPortalContainer, Portals, setMenuPortal } from '@campground/ui';
	import type { LayoutProps } from './$types.ts';
	import {
		BonfireContext,
		CampsiteContext,
		CampsiteReference,
		setCampsiteContext,
	} from './context.svelte.ts';
	import Sidebar from './BonfireSidebar/Sidebar.svelte';
	import WSClient from '$lib/api/ws/WSClient.js';
	import { filter, type Unsubscribable } from 'rxjs';

	const { children, params }: LayoutProps = $props();
	const [campsiteId, domain] = $derived(params.campsite.split('@'));

	const session = getSession();

	const appview = new HTTPBackendClient(session, () => domain);
	setAppview(appview);

	const campsiteContext = new CampsiteContext(setBonfire);
	setCampsiteContext(campsiteContext);

	async function setBonfire(bonfireId: string) {
		if (campsiteContext.openBonfire?.bonfireId === bonfireId || !campsiteContext.campsiteReference)
			return;

		const tents = await appview.tents.getMany(campsiteId, bonfireId);
		campsiteContext.openBonfire = new BonfireContext(
			bonfireId,
			campsiteContext.campsiteReference,
			tents,
		);
	}

	let webSocketUnsubscribe: Unsubscribable | null = null;

	async function fetchCampsite(domain: string, campsiteId: string) {
		const campsite = await appview.campsites.get(campsiteId);
		const webSocket = new WSClient({
			httpClient: session.atproto,
			url: `${domain?.split(':')[0] === 'localhost' ? 'http' : 'https'}://${domain}/ws/v1`,
		});

		webSocketUnsubscribe = webSocket?.messages
			.pipe(filter((value) => value.op === 0 && value.t === 'open'))
			.subscribe(() => webSocket.setCampsite(campsiteId));

		campsiteContext.campsiteReference = new CampsiteReference(domain, campsite, webSocket);
	}

	$effect(() => {
		// Make sure there is nothing trying to find bonfire that does not exist
		campsiteContext.openBonfire = null;
		campsiteContext.campsiteReference = null;
		fetchCampsite(domain, campsiteId);

		return () => (webSocketUnsubscribe?.unsubscribe(), (webSocketUnsubscribe = null));
	});

	// Since portals would otherwise lack all the campsite context
	// Svelte does not work like React and does not pass context through portals
	const menuPortal = new MenuPortal();
	setMenuPortal(menuPortal);
</script>

<Sidebar />

{@render children()}

<Portals.List>
	<MenuPortalContainer portal={menuPortal} />
</Portals.List>
