<script lang="ts">
	import { NavigationItemType, type NavigationCampsite, type NavigationItemAny } from '#lib/context/session/index.ts';
	import { scale } from 'svelte/transition';
	import CampsiteButton from './CampsiteButton.svelte';

	const { item }: { item: NavigationItemAny } = $props();
</script>

<div transition:scale={{ duration: 300, opacity: 1 }}>
    {#if item.type === NavigationItemType.Campsite}
        {const { campsite } = item as NavigationCampsite}
        <CampsiteButton
            id={campsite.id}
            domain={campsite.domain}
            name={campsite.name}
            memberCount={campsite.memberCount}
            avatar={campsite.avatarUri ?? undefined}
        />
    {/if}
</div>
