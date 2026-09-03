<script lang="ts">
	import { ActiveKey, Button, Card, getActiveKeys } from '@campground/ui';
	import {
		IconArrowBackUp,
		IconDots,
		IconPencilFilled,
		IconTrashFilled,
	} from '@tabler/icons-svelte';
	import type { MessageMenuProps } from './props.ts';

	const activeKeys = getActiveKeys();
	const showExtraKeys = $derived((activeKeys.keys & ActiveKey.Shift) === ActiveKey.Shift);
	const {
		onOverflow,
		toggleReply,
		cantToggleReply,
		setEditingMessage,
		deleteMessage,
	}: MessageMenuProps = $props();
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
		{#if showExtraKeys}
			<Button
				padding="equal"
				color="neutral"
				variant="plain"
				onclick={setEditingMessage}
			>
				<IconPencilFilled size="1.25rem" />
			</Button>
			<Button
				padding="equal"
				color="danger"
				variant="plain"
				onclick={deleteMessage}
			>
				<IconTrashFilled size="1.25rem" />
			</Button>
		{:else}
			<Button
				padding="equal"
				color="neutral"
				variant="plain"
				onclick={onOverflow}
			>
				<IconDots size="1.25rem" />
			</Button>
		{/if}
	</Card.Overflow>
</Card.Root>
