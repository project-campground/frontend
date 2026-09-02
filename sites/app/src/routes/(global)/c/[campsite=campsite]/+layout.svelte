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
	import { writable, type Writable } from 'svelte/store';
	import WSClient from '$lib/api/ws/WSClient.js';
	import { filter } from 'rxjs';

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

	const webSocket: Writable<WSClient | null> = writable();
	const campsite = writable<CampsiteReference | null>(null);
	const activeBonfire = writable<BonfireContext | null>(null);
	const campsiteContext = new CampsiteContext(campsite, activeBonfire, webSocket, setBonfire);
	setCampsiteContext(campsiteContext);

	$effect(() => {
		// Make sure there is nothing trying to find bonfire that does not exist
		$activeBonfire = null;
		$campsite = null;
		appview.campsites
			.get(campsiteId)
			.then((value) => ($campsite = new CampsiteReference(domain, campsiteId, value)));
	});
	$effect(() => {
		if ($webSocket?.isOpen) return $webSocket.setCampsite(campsiteId);

		$webSocket?.messages
			.pipe(filter((value) => value.op === 0 && value.t === 'open'))
			.subscribe(() => $webSocket!.setCampsite(campsiteId));
	});
	$effect(() => {
		$webSocket = new WSClient({
			url: `${domain?.split(':')[0] === 'localhost' ? 'http' : 'https'}://${domain}/ws/v1`,
			httpClient: session.atproto,
		});
	});
</script>

<Sidebar />

{@render children()}

<Portals.List>
	<MenuPortalContainer portal={menuPortal} />
</Portals.List>
