<script lang="ts">
	import { Button, Group, TextBlock } from '@campground/ui';
	import type { ReplyProps } from './props.ts';
	import { User } from '#lib/components/users/index.js';
	import { IconXFilled } from '@tabler/icons-svelte';

	const { message, onRemove }: ReplyProps = $props();
</script>

<Group gap={0.5}>
	<Button
		padding="equal"
		size="sm"
		variant="soft"
		color="neutral"
		onclick={onRemove}
	>
		<IconXFilled size="1rem" />
	</Button>
	<User.Display
		user={message.createdBy.user}
		size="xs"
		hideAvatar
	/>
	<TextBlock
		textWrap="nowrap"
		overflow="ellipsis"
		flex={1}
	>
		{message.content}
	</TextBlock>
</Group>
