<script lang="ts">
	import type { ProfileViewBasic } from '$lib/types/campground/user.js';
	import UserAvatar from './UserAvatar.svelte';
	import UserBanner from './UserBanner.svelte';

	interface Props extends Pick<ProfileViewBasic, 'avatar' | 'banner'> {}

	const { avatar, banner }: Props = $props();
</script>

<header class="container">
	<UserBanner src={banner} />
	<div class="display">
		<div class="avatarWrapper">
			<UserAvatar
				src={avatar}
				size="lg"
			/>
		</div>
	</div>
</header>

<style lang="scss">
	.display {
		display: flex;
		flex-direction: row;
		margin-top: -2rem;
		padding: 0 0.5rem;
	}
	.avatarWrapper {
		background-color: var(--background-content);
		padding: 0.25rem;
		border-radius: 30%;
	}
</style>
