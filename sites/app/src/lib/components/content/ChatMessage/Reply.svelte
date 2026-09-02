<script lang="ts">
	import UserDisplay from '$lib/components/users/UserDisplay/UserDisplay.svelte';
	import type { MessageViewBasic } from '$lib/types/campground/content.js';
	import { Group } from '@campground/ui';

	const { message }: { message: MessageViewBasic } = $props();
</script>

<Group gap={0.5}>
	<UserDisplay
		hideStatus
		user={message.createdBy.user}
		size="xs"
	/>
	{message.content.split('\n')[0]}
</Group>
