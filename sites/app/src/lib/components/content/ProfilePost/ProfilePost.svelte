<script lang="ts">
	import { Card, Group, Link } from '@campground/ui';
	import { UserDisplay } from '$lib/components/users/UserDisplay/index.js';
	import type { ProfilePostViewBasic } from '$lib/types/campground/user.js';
	import { IconMessage2Filled, IconRotate } from '@tabler/icons-svelte';
	import Markdown from '../../markdown/Markdown.svelte';

	const { profilePost }: { profilePost: ProfilePostViewBasic } = $props();

	const id = $derived(profilePost.uri.split('/').slice(-1)[0]);
</script>

<Card.Root size="md">
	<Card.Content>
		<header class="header">
			<UserDisplay
				displayHandle
				user={profilePost.author}
				align="start"
			/>
		</header>
		<div class="post">
			<div class="content">
				<Markdown value={profilePost.content} />
			</div>
			<Group>
				<Link
					color="neutral"
					href={`/profile/${profilePost.author.did}/posts/${id}`}
				>
					<IconMessage2Filled />
					{profilePost.replyCount} Replies
				</Link>
				<Link
					color="neutral"
					href={`/profile/${profilePost.author.did}/posts/${id}`}
				>
					<IconRotate />
					0 Re-posts
				</Link>
			</Group>
		</div>
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
