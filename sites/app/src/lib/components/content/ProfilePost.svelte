<script lang="ts">
	import { Card, Group, Link } from '@campground/ui';
	import UserDisplay from '../users/UserDisplay.svelte';
	import type { ProfilePostView } from '$lib/types/campground/user.js';
	import { IconMessage2Filled, IconRotate } from '@tabler/icons-svelte';

	const { profilePost }: { profilePost: ProfilePostView } = $props();

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
				{profilePost.content}
			</div>
			<Group>
				<Link
					color="neutral"
					href={`/profile/${profilePost.author.did}/posts/${id}`}
				>
					<IconMessage2Filled />
					0 Replies
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
		margin-bottom: -2rem;
	}
	.post {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: calc(3.5rem + 1ch);
	}
</style>
