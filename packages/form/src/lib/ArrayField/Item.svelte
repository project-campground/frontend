<script
	lang="ts"
	generics="T"
>
	import { Button, Card } from '@campground/ui';
	import { IconX } from '@tabler/icons-svelte';
	import type { ItemProps } from './props.ts';
	import { getArrayField } from './context.svelte.ts';
	import { setFieldControl } from '$lib/FieldControl/context.svelte.ts';

	const arrayField = getArrayField();

	const { item, children }: ItemProps<T> = $props();

	// svelte-ignore state_referenced_locally
	setFieldControl(item);
</script>

<li>
	<Card.Root
		direction="row"
		align="start"
		justify="start"
		gap={1}
	>
		<Card.Content flex={1}>
			{@render children()}
		</Card.Content>
		<Card.Content>
			<Button
				variant="soft"
				color="danger"
				padding="equal"
				size="md"
				onclick={() => arrayField.removeItem(item.key)}
			>
				<IconX size="1rem" />
			</Button>
		</Card.Content>
	</Card.Root>
</li>
