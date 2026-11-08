<script lang="ts">
	import { Avatar, TextBlock, Skeleton, loremIpsum, Group } from '@campground/ui';
	import NavbarButton from './NavbarButton.svelte';
	import { IconUserFilled } from '@tabler/icons-svelte';
</script>

<NavbarButton>
	<div class="margin"></div>
	<div class="content">
		<TextBlock level="subheading">
			<Skeleton>
				{loremIpsum.sm}
			</Skeleton>
		</TextBlock>
		<TextBlock
			level="subtext"
			fontSize={0.85}
		>
			<Group gap={0.5}>
				<Skeleton>
					<IconUserFilled size="0.75rem" />
				</Skeleton>
				<Skeleton>
					{loremIpsum.sm}
				</Skeleton>
			</Group>
		</TextBlock>
	</div>
	<Skeleton radius="avatar">
		<Avatar size="sm"></Avatar>
	</Skeleton>
</NavbarButton>

<style lang="scss">
	.margin {
		width: 0;
	}
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
</style>
