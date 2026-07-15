<script lang="ts">
	import { defaultAvatar } from '$lib/api/api.config';
	import { Avatar, type AvatarProps } from '@campground/ui';

	interface Props extends AvatarProps {
		showStatus?: boolean;
		src?: string | null;
	}

	const { src, ...props }: Props = $props();
</script>

<Avatar
	src={src || defaultAvatar}
	{...props}
/>
