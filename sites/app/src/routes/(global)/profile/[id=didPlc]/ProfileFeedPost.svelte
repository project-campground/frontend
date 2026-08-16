<script lang="ts">
	import { ProfilePost } from '$lib/components/index.js';
	import type { ProfilePostViewParented } from '$lib/types/campground/user.js';
	import { Threaded } from '@campground/ui';

	interface Props {
		profilePost: ProfilePostViewParented;
	}
	const { profilePost }: Props = $props();
</script>

{#if profilePost.parent}
	<Threaded.Root>
		{#snippet parent()}
			<ProfilePost profilePost={profilePost.parent!} />
		{/snippet}
		<Threaded.Item>
			<ProfilePost {profilePost} />
		</Threaded.Item>
	</Threaded.Root>
{:else}
	<ProfilePost {profilePost} />
{/if}
