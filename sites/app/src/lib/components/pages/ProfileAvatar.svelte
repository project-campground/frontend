<script lang="ts">
	import { Avatar, type AvatarProps } from '@campground/ui';
	import { bannerGenericColors } from './ProfileBanner.svelte';
	import type { Snippet } from 'svelte';

	interface Props extends Omit<AvatarProps, 'id'> {
		id: string;
		defaultSrc?: string;
		children: Snippet;
	}

	const { id, children, defaultSrc, src, ...props }: Props = $props();
</script>

<Avatar
	src={src || defaultSrc}
	color={bannerGenericColors[(id.charCodeAt(0) ?? 0) % bannerGenericColors.length]!}
	{...props}
>
	{@render children()}
</Avatar>
