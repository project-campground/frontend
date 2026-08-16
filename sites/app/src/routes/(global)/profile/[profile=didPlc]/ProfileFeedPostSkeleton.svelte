<script lang="ts">
	import { ProfilePost, ProfilePostSkeleton } from '$lib/components/index.js';
	import type { ProfilePostViewParented } from '$lib/types/campground/user.js';
	import { Threaded } from '@campground/ui';

	interface Props {
		hasParent?: boolean;
	}
	const { hasParent }: Props = $props();
</script>

{#if hasParent}
	<Threaded.Root>
		{#snippet parent()}
			<ProfilePostSkeleton />
		{/snippet}
		<Threaded.Item>
			<ProfilePostSkeleton />
		</Threaded.Item>
	</Threaded.Root>
{:else}
	<ProfilePostSkeleton />
{/if}
