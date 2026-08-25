<script lang="ts">
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { IconHash, IconLayout2Filled } from '@tabler/icons-svelte';

	const { type }: Pick<TentViewBasic, 'viewType'> & { type: TentViewBasic['type'] | 'bulletin' } =
		$props();
</script>

{#if type === 'text'}
	<IconHash size="1.25rem" />
{:else if type === 'bulletin'}
	<IconLayout2Filled size="1.25rem" />
{/if}
