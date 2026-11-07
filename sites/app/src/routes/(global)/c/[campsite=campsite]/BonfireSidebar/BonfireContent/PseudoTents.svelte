<script lang="ts">
	import { localeStrings } from '#lib/locale/index.js';
	import { getLocale } from '@campground/locale';
	import { getCampsiteContext } from '../../context.svelte.ts';
	import { pseudoTentList } from '#lib/components/tents/pseudoTents.js';
	import { Stack } from '@campground/ui';
	import TentListButton from '../../TentList/TentListButton.svelte';
	import { hasAnyPermission } from '#lib/util/permissions.js';

    const campsiteContext = getCampsiteContext();
    const campsiteReference = $derived(campsiteContext.campsiteReference!);
    const intl = getLocale();
</script>

{const pseudoTents = pseudoTentList.filter((tent) => !tent.requiresAnyPermission || campsiteContext.userIsOwner || hasAnyPermission(campsiteContext.permissions, tent.requiresAnyPermission)).map((tent) => ({
    ...tent,
    campsiteId: campsiteReference.campsite.id,
    position: 0,
    categoryId: null,
    name: intl.formatMessage(localeStrings.tents[tent.id as 'bulletin']),
}))}
<Stack gap={0.25}>
    {#each pseudoTents as tent (tent.id)}
        <TentListButton
            {tent}
            domain={campsiteReference.domain}
        />
    {/each}
</Stack>
