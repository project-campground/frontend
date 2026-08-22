<script lang="ts">
	import { AccountNavbarItemType, type AccountNavbarCampsite, type AccountNavbarItemAny } from '$lib/context/account.svelte.js';
	import { scale } from 'svelte/transition';
	import CampsiteButton from './CampsiteButton.svelte';

	const { item }: { item: AccountNavbarItemAny } = $props();
</script>

<div transition:scale={{ duration: 300, opacity: 1 }}>
    {#if item.type === AccountNavbarItemType.Campsite}
        {const { campsite } = item as AccountNavbarCampsite}
        <CampsiteButton
            id={campsite.id}
            domain={campsite._domain}
            name={campsite.name}
            memberCount={campsite.memberCount}
            avatar={campsite.avatarUri ?? undefined}
        />
    {/if}
</div>
