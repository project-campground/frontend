<script lang="ts">
	import { Skeleton } from '@campground/ui';
	import UserAvatar from '../UserAvatar.svelte';
	import type { UserDisplayProps } from './props.ts';
	import UserDisplayRoot from './UserDisplayRoot.svelte';

	const { size, ...props }: Omit<UserDisplayProps, 'user'> = $props();
</script>

<UserDisplayRoot
	{size}
	{...props}
>
	{#snippet avatar()}
		<Skeleton radius="avatar">
			<UserAvatar {size} />
		</Skeleton>
	{/snippet}
	{#snippet displayName()}
		<Skeleton>Example</Skeleton>
	{/snippet}
	{#snippet handle()}
		<Skeleton>@example.com</Skeleton>
	{/snippet}
</UserDisplayRoot>
