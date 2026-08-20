<script lang="ts">
	import { Avatar, Badge, type AvatarProps } from '@campground/ui';
	import { gradientColors } from './UserBanner.svelte';
	import { defaultAvatar } from '$lib/api/api.config.js';

	interface Props extends AvatarProps {
		did: string;
		showStatus?: boolean;
		src?: string | null;
	}

	const { did, size, src, ...props }: Props = $props();
</script>

<Badge
	color="online"
	{size}
>
	<Avatar
		src={src || defaultAvatar}
		color={gradientColors[(did.split(':')[2]?.charCodeAt(0) ?? 0) % gradientColors.length]!}
		{size}
		{...props}
	/>
</Badge>
