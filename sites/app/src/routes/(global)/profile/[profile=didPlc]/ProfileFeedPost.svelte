<script
	lang="ts"
	module
>
	const messages = defineMessages({
		deletedPost: {
			id: 'app.profilePost.deletedParent',
			defaultMessage: 'The post has been deleted by the author or failed to be fetched.',
			description: 'Alert indicating that the parent post has been deleted',
		},
	});
</script>

<script lang="ts">
	import { ProfilePost } from '$lib/components/index.js';
	import type { ProfilePostViewParented } from '$lib/types/campground/user.js';
	import { FormattedMessage } from '@campground/locale';
	import { Alert, Threaded } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconTrashFilled } from '@tabler/icons-svelte';

	interface Props {
		profilePost: ProfilePostViewParented;
	}
	const { profilePost }: Props = $props();
</script>

{#if profilePost.parent || profilePost.parentUri}
	<Threaded.Root size="sm">
		{#snippet parent()}
			{#if profilePost.parent}
				<ProfilePost profilePost={profilePost.parent!} />
			{:else}
				<Alert color="warning">
					{#snippet icon()}
						<IconTrashFilled />
					{/snippet}
					<FormattedMessage {...messages.deletedPost} />
				</Alert>
			{/if}
		{/snippet}
		<Threaded.Item>
			<ProfilePost {profilePost} />
		</Threaded.Item>
	</Threaded.Root>
{:else}
	<ProfilePost {profilePost} />
{/if}
