<script lang="ts">
	import { Button, Chip, Group } from '@campground/ui';
	import { IconXFilled } from '@tabler/icons-svelte';

	const { removeItem, value }: { removeItem: () => unknown; value: string } = $props();
</script>

<Chip color="neutral">
	<Group>
		<span>
			{value}
		</span>
		<Button
			size="sm"
			padding="equal"
			color="neutral"
			variant="plain"
			onclick={removeItem}
		>
			<IconXFilled size="0.85rem" />
		</Button>
	</Group>
</Chip>
