<script lang="ts">
	import { getAuth } from '#lib/context/auth/context.svelte.js';
	import { Button } from '@campground/ui';
	import CampsiteButton from '../../Navbar/CampsiteButton.svelte';
	import { getSession, NavigationItemType } from '#lib/context/session/index.js';
	import { IconStar, IconStarFilled } from '@tabler/icons-svelte';
	import type { CampsiteViewBasic } from '#lib/types/campground/campsites.js';

	const session = getAuth();
	const account = getSession();

	const { domain }: { domain: string } = $props();
	const campsiteList = $derived(
		(await session.atproto.getBackendJoinedCampsites(domain)),
	);

	function toggleFavoriteCampsite(domain: string, campsite: CampsiteViewBasic, favorite: boolean) {
		if (favorite)
			return account.removeCampsiteFromNavbar(domain, campsite.id);

		return account.addCampsiteToNavbar(domain, campsite);
	}
</script>

{#each campsiteList as campsite (campsite.id)}
	{const favorite = $derived(account.navbarItems.some((x) => x.type === NavigationItemType.Campsite && x.campsite.domain === domain && x.campsite.id === campsite.id))}
	<CampsiteButton
		id={campsite.id}
		name={campsite.name}
		avatar={campsite.avatarUri ?? undefined}
		domain={domain}
		memberCount={campsite.memberCount}
	>
		{#snippet additional()}
			<Button size="sm" variant="plain" color={favorite ? 'primary' : 'neutral'} onclick={() => toggleFavoriteCampsite(domain, campsite, favorite)}>
				{#if favorite}
					<IconStarFilled size="1rem" />
				{:else}
					<IconStar size="1rem" />
				{/if}
			</Button>
		{/snippet}
	</CampsiteButton>
{/each}
