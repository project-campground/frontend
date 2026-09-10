<script
	lang="ts"
	module
>
	export const messages = defineMessages({
		edit: {
			id: 'app.profilePost.edit',
			defaultMessage: 'Edit post',
			description: 'Button for editing profile posts',
		},
		delete: {
			id: 'app.profilePost.delete',
			defaultMessage: 'Delete post',
			description: 'Button for deleting profile posts',
		},
	});
</script>

<script lang="ts">
	import { Card, Group, Link, Menu, type ComponentSize } from '@campground/ui';
	import { UserDisplay } from '$lib/components/users/UserDisplay/index.js';
	import type { ProfilePostViewBasic } from '$lib/types/campground/user.js';
	import { IconMessage2Filled, IconPencilFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import Markdown from '../../markdown/Markdown/Root.svelte';
	import { ContentOverflow } from '../ContentOverflow/index.ts';
	import { getAccount } from '$lib/context/account.svelte.js';
	import { LocaleMessage } from '@campground/locale';
	import { defineMessages } from '@formatjs/svelte-intl';
	import BasicPostEditor from '$lib/components/editor/BasicPostEditor.svelte';
	import { getSession } from '$lib/api/session/Session.svelte.js';
	import { getAppview } from '$lib/context/api.js';

	const session = getSession();
	const appview = getAppview();

	function updatePost(content: string) {
		beingEdited = false;
		const updatedAt = new Date().toISOString();

		return Promise.all([
			appview.profilePosts
				.unindex(profilePost.uri)
				.catch((err) => console.error('Error unindexing post', err)),
			session.atproto.profilePostRecords
				.update(profilePost.uri, { content })
				.then(() => Object.assign(profilePost, { updatedAt, content }))
				.catch((err) => console.error('Error editing a post', err)),
		]);
	}
	function deletePost() {
		return Promise.all([
			session.atproto.profilePostRecords
				.delete(profilePost.uri)
				.catch((err) => console.error('Error deleting a post', err)),
			appview.profilePosts
				.unindex(profilePost.uri)
				.catch((err) => console.error('Error unindexing post', err)),
		]);
	}

	const {
		profilePost,
		hideReplyCount,
		size,
	}: { profilePost: ProfilePostViewBasic; hideReplyCount?: boolean; size?: ComponentSize } =
		$props();

	const account = getAccount();
	const authorIsCurrentUser = $derived(profilePost.author.did === account.sessionInfo?.did);

	const id = $derived(profilePost.uri.split('/').slice(-1)[0]);

	let beingEdited: boolean = $state(false);
</script>

<Card.Root
	size={size ?? 'md'}
	class="ContentOverflow-parent"
>
	<Card.Content>
		<header class="header">
			<UserDisplay
				displayHandle
				size={size ?? 'md'}
				user={profilePost.author}
				align="start"
			/>
		</header>
		{#if beingEdited}
			<div class="post">
				<BasicPostEditor
					onCancel={() => (beingEdited = false)}
					onSubmit={updatePost}
				></BasicPostEditor>
			</div>
		{:else}
			<ContentOverflow>
				{#if authorIsCurrentUser}
					<Menu.Item>
						<Menu.Button onclick={() => (beingEdited = true)}>
							<IconPencilFilled />
							<LocaleMessage {...messages.edit} />
						</Menu.Button>
					</Menu.Item>
					<Menu.Item>
						<Menu.Button
							color="danger"
							onclick={deletePost}
						>
							<IconTrashFilled />
							<LocaleMessage {...messages.delete} />
						</Menu.Button>
					</Menu.Item>
				{/if}
			</ContentOverflow>
			<div class="post">
				<div class="content">
					<Markdown value={profilePost.content} />
				</div>
				<Group>
					{#if !hideReplyCount}
						<Link
							color="neutral"
							href={`/profile/${profilePost.author.did}/posts/${id}`}
						>
							<IconMessage2Filled />
							{profilePost.replyCount} Replies
						</Link>
					{/if}
				</Group>
			</div>
		{/if}
	</Card.Content>
</Card.Root>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: row;
		gap: 2ch;
		margin-bottom: -1.5rem;
	}
	.post {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: calc(3rem + 1ch);
	}
</style>
