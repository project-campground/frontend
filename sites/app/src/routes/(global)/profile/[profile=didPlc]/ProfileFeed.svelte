<script
	lang="ts"
	module
>
	const messages = defineMessages({
		finalTitle: {
			id: 'app.profile.end.title',
			defaultMessage: 'No more posts',
			description: 'The title of the info at the bottom that there are no more posts',
		},
		finalDescription: {
			id: 'app.profile.end.desc',
			defaultMessage: 'There are no more posts by this user in this section.',
			description: 'The description of the info at the bottom that there are no more posts',
		},
	});
</script>

<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import type { ProfilePostViewParented } from '$lib/types/campground/user.js';

	import { FormattedMessage } from '@campground/locale';

	import { PagePlaceholder, PagePlaceholderIcon, Stack } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { onMount } from 'svelte';
	import ProfileFeedPost from './ProfileFeedPost.svelte';

	interface Props {
		did: string;
		withReplies?: boolean;
	}

	export function onAddPost(post: ProfilePostViewParented) {
		posts = [post, ...posts];
	}

	const appview = getAppview();
	const { did, withReplies }: Props = $props();

	let posts = $derived(
		await appview.profilePosts.getMany(did, withReplies ?? false).then((value) => value.posts),
	);
</script>

<div class="padding">
	<Stack gap={1}>
		{#each posts as post (post.uri)}
			<ProfileFeedPost profilePost={post} />
		{/each}
		<PagePlaceholder icon={PagePlaceholderIcon.NoMore}>
			{#snippet title()}
				<FormattedMessage {...messages.finalTitle} />
			{/snippet}
			<FormattedMessage {...messages.finalDescription} />
		</PagePlaceholder>
	</Stack>
</div>

<style lang="scss">
	.padding {
		padding-top: 1rem;
		padding-bottom: 8rem;
	}
</style>
