<script lang="ts">
	import { Badge, type AvatarProps } from '@campground/ui';
	import { defaultAvatar } from '$lib/api/api.config.js';
	import ProfileAvatar from '../pages/ProfileAvatar.svelte';

	interface Props extends Omit<AvatarProps, 'id' | 'placeholder'> {
		did: string;
		hideStatus?: boolean;
	}

	const { did, size, children, hideStatus, ...props }: Props = $props();
</script>

<Badge
	color="online"
	hideBadge={hideStatus}
	{size}
>
	<ProfileAvatar
		id={did.split(':')[2]}
		defaultSrc={defaultAvatar}
		{size}
		{...props}
	>
		{@render children?.()}
	</ProfileAvatar>
</Badge>
