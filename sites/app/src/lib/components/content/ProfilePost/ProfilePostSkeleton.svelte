<script lang="ts">
	import { Card, Group, loremIpsum, Skeleton, TextBlock } from '@campground/ui';
	import { UserDisplaySkeleton } from '$lib/components/users/UserDisplay/index.js';
</script>

<Card.Root size="md">
	<Card.Content>
		<header class="header">
			<UserDisplaySkeleton
				displayHandle
				align="start"
			/>
		</header>
		<div class="post">
			<div class="content">
				<Skeleton>
					{loremIpsum.lg}
				</Skeleton>
			</div>
			<Group>
				<TextBlock>
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				</TextBlock>
				<TextBlock>
					<Skeleton>
						{loremIpsum.sm}
					</Skeleton>
				</TextBlock>
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
