<script lang="ts">
	import UserAvatar from '../UserAvatar.svelte';
	import type { UserDisplayProps } from './props.ts';
	import UserDisplayRoot from './UserDisplayRoot.svelte';

	const { user, size, ...props }: UserDisplayProps = $props();
</script>

<UserDisplayRoot
	{size}
	{...props}
>
	{#snippet avatar()}
		<UserAvatar
			src={user.avatar}
			{size}
		/>
	{/snippet}
	{#snippet displayName()}
		{user.displayName ?? user.handle}
	{/snippet}
	{#snippet handle()}
		@{user.handle}
	{/snippet}
</UserDisplayRoot>
