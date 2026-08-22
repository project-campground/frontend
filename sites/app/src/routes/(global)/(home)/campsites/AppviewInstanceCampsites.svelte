<script lang="ts">
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import CampsiteButton from '../../Navbar/CampsiteButton.svelte';

	const session = getSession();
	const { domain }: { domain: string } = $props();
	const campsiteList = $derived(
		(await session.atproto.getBackendJoinedCampsites(domain.split('/')[2])).campsites,
	);
</script>

{#each campsiteList as campsite (campsite.id)}
	<CampsiteButton
		id={campsite.id}
		name={campsite.name}
		avatar={campsite.avatarUri ?? undefined}
		domain={domain.split('/')[2]}
		memberCount={campsite.memberCount}
	></CampsiteButton>
{/each}
