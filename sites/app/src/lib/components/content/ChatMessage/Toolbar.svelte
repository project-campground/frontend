<script lang="ts">
	import { Button, Card } from '@campground/ui';
	import { IconDots, IconPencilFilled } from '@tabler/icons-svelte';

	const {
		onOverflow,
	}: {
		onOverflow: (event: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }) => unknown;
	} = $props();
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
		>
			<IconPencilFilled size="1.25rem" />
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
