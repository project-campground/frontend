<script lang="ts">
	import { User } from '$lib/components/users/index.js';
	import { Card, Group, loremIpsum, Skeleton, TextBlock } from '@campground/ui';
</script>

<Card.Root size="md">
	<Card.Content>
		<header class="header">
			<User.DisplaySkeleton
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
		margin-bottom: -1rem;
	}
	.post {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: calc(2.5rem + 1ch);
	}
</style>
