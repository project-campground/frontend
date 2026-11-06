<script lang="ts">
	import { Stack } from '@campground/ui';
	import ProfileAvatarWrapper from '../ProfileAvatarWrapper.svelte';
	import type { Snippet } from 'svelte';

	const { banner, avatar, children }: { banner: Snippet; avatar: Snippet; children: Snippet } =
		$props();
</script>

<Stack align="stretch">
	{@render banner()}
	<Stack align="center">
		<div class="avatar">
			<ProfileAvatarWrapper>
				{@render avatar()}
			</ProfileAvatarWrapper>
		</div>
		{@render children()}
	</Stack>
</Stack>

<style lang="scss">
	.avatar {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		height: fit-content;
		box-sizing: border-box;
		margin-top: -3rem;
		margin-bottom: -0.5rem;
	}
</style>
