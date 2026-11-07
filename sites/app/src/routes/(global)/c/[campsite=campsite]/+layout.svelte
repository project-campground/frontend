<script lang="ts">
	import HTTPBackendClient from '#lib/api/http/HTTPBackendClient.js';
	import { getAuth } from '#lib/context/auth/context.svelte.js';
	import { setAppview } from '#lib/context/api.js';
	import { MenuPortal, MenuPortalContainer, Portals, setMenuPortal } from '@campground/ui';
	import type { LayoutProps } from './$types.ts';
	import { CampsiteContext, CampsiteReference, setCampsiteContext } from './context.svelte.ts';
	import Sidebar from './BonfireSidebar/Sidebar.svelte';
	import { type Unsubscribable } from 'rxjs';
	import { handleWebSocket } from './ws/index.svelte.ts';
	import { getSession } from '#lib/context/session/context.svelte.js';
	import { BonfireContext } from './bonfires.svelte.ts';

	const { children, params }: LayoutProps = $props();
	const [campsiteId, domain] = $derived(params.campsite.split('@'));

	const auth = getAuth();
	const session = getSession();

	const appview = new HTTPBackendClient(auth, () => domain);
	setAppview(appview);

	const campsiteContext = new CampsiteContext(setBonfire);
	setCampsiteContext(campsiteContext);

	async function setBonfire(bonfireId: string) {
		if (campsiteContext.openBonfire?.id === bonfireId || !campsiteContext.campsiteReference) return;

		campsiteContext.openBonfire = await BonfireContext.initialize(
			campsiteId,
			bonfireId,
			campsiteContext,
			appview,
		);
	}

	let webSocketUnsubscribe: Unsubscribable | null = null;

	async function fetchCampsite(domain: string, campsiteId: string) {
		campsiteContext.campsiteReference = await CampsiteReference.initialize(
			auth,
			appview,
			domain,
			campsiteId,
		);
	}

	$effect(() => {
		// Make sure there is nothing trying to find bonfire that does not exist
		campsiteContext.openBonfire = null;
		campsiteContext.campsiteReference = null;
		fetchCampsite(domain, campsiteId).catch((e) => console.error(e));

		return () => (webSocketUnsubscribe?.unsubscribe(), (webSocketUnsubscribe = null));
	});

	$effect(() => {
		if (!campsiteContext.campsiteReference) return;

		return handleWebSocket(campsiteContext, session);
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
