<script lang="ts">
	import { User } from '$lib/components/users/index.js';
	import type { MessageViewBasic } from '$lib/types/campground/content.js';
	import { Group } from '@campground/ui';

	const { message }: { message: MessageViewBasic } = $props();
</script>

<Group gap={0.5}>
	<User.Display
		hideStatus
		user={message.createdBy.user}
		size="xs"
	/>
	{message.content.split('\n')[0]}
</Group>
