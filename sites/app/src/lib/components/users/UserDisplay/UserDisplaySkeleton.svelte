<script lang="ts">
	import { Avatar, Skeleton, Badge } from '@campground/ui';
	import type { UserDisplayProps } from './props.ts';
	import UserDisplayRoot from './UserDisplayRoot.svelte';

	const { size, ...props }: Omit<UserDisplayProps, 'user'> = $props();
</script>

<UserDisplayRoot
	{size}
	{...props}
>
	{#snippet avatar()}
		<Badge color="skeleton">
			<Skeleton radius="avatar">
				<Avatar {size} />
			</Skeleton>
		</Badge>
	{/snippet}
	{#snippet displayName()}
		<Skeleton>Example</Skeleton>
	{/snippet}
	{#snippet handle()}
		<Skeleton>@example.com</Skeleton>
	{/snippet}
</UserDisplayRoot>
