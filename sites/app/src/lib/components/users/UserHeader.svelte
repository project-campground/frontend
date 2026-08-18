<script lang="ts">
	import type { ProfileViewBasic } from '$lib/types/campground/user.js';
	import UserAvatar from './UserAvatar.svelte';
	import UserBanner from './UserBanner.svelte';

	interface Props extends Pick<ProfileViewBasic, 'did' | 'avatar' | 'banner'> {}

	const { did, avatar, banner }: Props = $props();
</script>

<header class="container">
	<UserBanner
		{did}
		src={banner}
	/>
	<div class="display">
		<div class="avatarWrapper">
			<UserAvatar
				{did}
				src={avatar}
				size="lg"
			/>
		</div>
	</div>
</header>

<style lang="scss">
	@use '@campground/ui' as *;

	.display {
		display: flex;
		flex-direction: row;
		margin-top: -2rem;
		padding: 0 0.5rem;
	}
	.avatarWrapper {
		background-color: var(--background-content);
		padding: 0.25rem;
		@extend %Squircle;
	}
</style>
