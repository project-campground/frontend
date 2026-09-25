<script lang="ts">
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { IconHash, IconLayout2Filled, IconUserFilled } from '@tabler/icons-svelte';
	import type { PseudoTentType } from './pseudoTents.ts';

	const {
		type,
	}: Pick<TentViewBasic, 'viewType'> & { type: TentViewBasic['type'] | PseudoTentType } = $props();
</script>

{#if type === 'text'}
	<IconHash size="1.25rem" />
{:else if type === 'bulletin'}
	<IconLayout2Filled size="1.25rem" />
{:else if type === 'members'}
	<IconUserFilled size="1.25rem" />
{/if}
