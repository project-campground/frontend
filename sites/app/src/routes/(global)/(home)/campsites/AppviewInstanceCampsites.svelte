<script lang="ts">
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { Button } from '@campground/ui';
	import CampsiteButton from '../../Navbar/CampsiteButton.svelte';
	import { AccountNavbarItemType, getAccount } from '$lib/context/account.svelte.js';
	import { IconStar, IconStarFilled } from '@tabler/icons-svelte';
	import type { CampsiteViewBasic } from '$lib/types/campground/campsites.js';

	const session = getSession();
	const account = getAccount();

	const { domain }: { domain: string } = $props();
	const campsiteList = $derived(
		(await session.atproto.getBackendJoinedCampsites(domain)).campsites,
	);

	function toggleFavoriteCampsite(domain: string, campsite: CampsiteViewBasic, favorite: boolean) {
		if (favorite)
			return account.removeCampsiteFromNavbar(domain, campsite.id);

		return account.addCampsiteToNavbar(domain, campsite);
	}
</script>

{#each campsiteList as campsite (campsite.id)}
	{const favorite = $derived(account.navbarItems.some((x) => x.type === AccountNavbarItemType.Campsite && x.campsite._domain === domain && x.campsite.id === campsite.id))}
	<CampsiteButton
		id={campsite.id}
		name={campsite.name}
		avatar={campsite.avatarUri ?? undefined}
		domain={domain.split('/')[2]}
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
