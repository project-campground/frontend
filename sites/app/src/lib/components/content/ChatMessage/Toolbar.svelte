<script lang="ts">
	import { Button, Card } from '@campground/ui';
	import { IconArrowBackUp, IconDots } from '@tabler/icons-svelte';
	import type { MessageMenuProps } from './props.ts';

	const { onOverflow, toggleReply, cantToggleReply }: MessageMenuProps = $props();
</script>

<Card.Root size="xs">
	<Card.Overflow
		flex={1}
		direction="row"
	>
		<Button
			padding="equal"
			color="neutral"
			variant="plain"
			disabled={cantToggleReply}
			onclick={toggleReply}
		>
			<IconArrowBackUp size="1.25rem" />
		</Button>
		<Button
			padding="equal"
			color="neutral"
			variant="plain"
			onclick={onOverflow}
		>
			<IconDots size="1.25rem" />
		</Button>
	</Card.Overflow>
</Card.Root>
