<script
	lang="ts"
	module
>
	const messages = defineMessages({
		finalTitle: {
			id: 'app.profilePost.end.title',
			defaultMessage: 'No more replies',
			description: 'The title of the info at the bottom that there are no more post replies',
		},
		finalDescription: {
			id: 'app.profilePost.end.desc',
			defaultMessage: 'There are no more replies on this post.',
			description: 'The description of the info at the bottom that there are no more post replies',
		},
	});
</script>

<script lang="ts">
	import { getAppview } from '$lib/context/api.js';
	import { getAccount } from '$lib/context/account.svelte.js';
	import HTTPProfilePostRecordManager from '$lib/api/http/profilePostRecord.js';
	import { ProfilePost } from '$lib/components/index.js';
	import { PagePlaceholder, PagePlaceholderIcon, Threaded } from '@campground/ui';
	import ProfilePostCreator from '../../ProfilePostCreator.svelte';
	import type { ProfilePostViewBasic } from '$lib/types/campground/user.js';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { FormattedMessage } from '@campground/locale';

	const appview = getAppview();
	const currentUser = getAccount();

	function onReplyCreate(content: string) {
		const createdAt = new Date().toISOString();
		const parentUri = `at://${did}/${HTTPProfilePostRecordManager.RecordType}/${postId}`;

		return appview.atproto.profilePostRecords
			.create({ content, createdAt, updatedAt: createdAt, parentUri })
			.then(({ uri }) => {
				profilePost.replies = [
					{
						uri,
						parentUri,
						content,
						createdAt,
						updatedAt: createdAt,
						indexedAt: createdAt,
						author: {
							did: currentUser.sessionInfo!.did,
							handle: currentUser.sessionInfo!.handle,
							...currentUser.profile!,
						},
						replyCount: 0,
					},
					...profilePost.replies,
				] satisfies ProfilePostViewBasic[];
			})
			.catch((err) => console.error('Error creating a reply post', err));
	}

	interface Props {
		did: string;
		postId: string;
	}

	const { did, postId }: Props = $props();

	const profilePost = $derived(await appview.profilePosts.get(did, postId));
</script>

{#if profilePost.parent}
	<div class="parent">
		<ProfilePost profilePost={profilePost.parent} />
	</div>
{/if}

<Threaded.Root>
	{#snippet parent()}
		<ProfilePost
			profilePost={{ ...profilePost, replyCount: 0 }}
			hideReplyCount
		/>
	{/snippet}
	<Threaded.Item>
		<ProfilePostCreator onSubmit={onReplyCreate} />
	</Threaded.Item>
	{#each profilePost.replies as reply (reply.uri)}
		<Threaded.Item>
			<ProfilePost profilePost={reply} />
		</Threaded.Item>
	{/each}
</Threaded.Root>

<div class="final">
	<PagePlaceholder icon={PagePlaceholderIcon.NoMore}>
		{#snippet title()}
			<FormattedMessage {...messages.finalTitle} />
		{/snippet}
		<FormattedMessage {...messages.finalDescription} />
	</PagePlaceholder>
</div>

<style lang="scss">
	.parent {
		opacity: 75%;
		margin-block-end: 1rem;
		padding-inline: 2rem;
	}
	.final {
		padding-block-start: 2rem;
	}
</style>
