<script lang="ts">
	import { defaultAvatar } from '$lib/api/api.config.js';
	import { Avatar, Badge, type AvatarProps } from '@campground/ui';

	interface Props extends AvatarProps {
		showStatus?: boolean;
		src?: string | null;
	}

	const { size, src, ...props }: Props = $props();
</script>

<Badge
	color="online"
	{size}
>
	<Avatar
		src={src || defaultAvatar}
		{size}
		{...props}
	/>
</Badge>
