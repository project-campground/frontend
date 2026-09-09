<script lang="ts">
	import { Badge, type AvatarProps, type StatusColor } from '@campground/ui';
	import type { ProfileStatus } from '$lib/types/campground/user.js';
	import { defaultAvatar } from '$lib/api/api.config.js';
	import ProfileAvatar from '../pages/ProfileAvatar.svelte';

	interface Props extends Omit<AvatarProps, 'id' | 'placeholder'> {
		did: string;
		status?: ProfileStatus | null;
		hideStatus?: boolean;
	}

	const statusToBadgeColor: Record<ProfileStatus, StatusColor> = {
		online: 'online',
		donotdisturb: 'dnd',
		idle: 'idle',
		offline: 'offline',
	};

	const { did, size, children, hideStatus, status, ...props }: Props = $props();
</script>

<Badge
	color={status ? statusToBadgeColor[status] : 'online'}
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
