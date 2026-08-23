<script lang="ts">
	import { Badge, type AvatarProps } from '@campground/ui';
	import { defaultAvatar } from '$lib/api/api.config.js';
	import ProfileAvatar from '../pages/ProfileAvatar.svelte';

	interface Props extends Omit<AvatarProps, 'id' | 'placeholder'> {
		did: string;
		showStatus?: boolean;
	}

	const { did, size, children, ...props }: Props = $props();
</script>

<Badge
	color="online"
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
