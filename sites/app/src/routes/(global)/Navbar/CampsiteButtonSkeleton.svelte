<script lang="ts">
	import { Avatar, TextBlock, Skeleton, loremIpsum } from '@campground/ui';
	import NavbarButton from './NavbarButton.svelte';
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
			<Skeleton>
				{loremIpsum.sm}
			</Skeleton>
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
