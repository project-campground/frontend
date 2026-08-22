<script lang="ts">
	import HTTPBackendClient from '$lib/api/http/HTTPBackendClient.js';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { setAppview } from '$lib/context/api.js';
	import { Card } from '@campground/ui';
	import type { LayoutProps } from './$types.ts';

	const { children, params }: LayoutProps = $props();
	const [campsiteId, domain] = $derived(params.campsite.split('@'));

	const session = getSession();

	setAppview(new HTTPBackendClient(session, () => domain));
</script>

<div class="container">
	<Card.Root>
		{domain}
		{campsiteId}
	</Card.Root>
	{@render children()}
</div>
