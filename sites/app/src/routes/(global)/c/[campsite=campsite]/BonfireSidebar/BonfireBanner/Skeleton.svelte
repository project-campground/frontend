<script lang="ts">
	import { Para, Stack, Skeleton, loremIpsum, Avatar } from '@campground/ui';
	import ProfileAvatarWrapper from '$lib/components/pages/ProfileAvatarWrapper.svelte';
	import Layout from './Layout.svelte';
</script>

<Layout>
	{#snippet banner()}
		<Skeleton
			aspectRatio={2.5}
			w="100%"
		></Skeleton>
	{/snippet}
	<Skeleton>
		<ProfileAvatarWrapper>
			<Avatar size="sm" />
		</ProfileAvatarWrapper>
	</Skeleton>
	<Stack gap={0}>
		<Para level="h4">
			<Skeleton>
				{loremIpsum.sm}
			</Skeleton>
		</Para>
		<Para level="sub0">
			<Skeleton>
				{loremIpsum.sm}
			</Skeleton>
		</Para>
	</Stack>
</Layout>
