<script
	lang="ts"
	generics="T"
>
	import { FormControl } from '$lib/FormControl/index.js';
	import { Button, Card } from '@campground/ui';
	import { IconX } from '@tabler/icons-svelte';
	import type { ItemProps } from './props.ts';
	import { getFormArray } from './context.svelte.ts';

	const formArray = getFormArray();

	const { id, value, children }: ItemProps<T> = $props();
</script>

<li>
	<Card.Root
		direction="row"
		align="start"
		justify="start"
		gap={1}
	>
		<Card.Content flex={1}>
			<FormControl
				{id}
				defaultValue={value}
				required
			>
				{@render children()}
			</FormControl>
		</Card.Content>
		<Card.Content>
			<Button
				variant="soft"
				color="danger"
				padding="equal"
				size="md"
				onclick={() => formArray.removeItem(id)}
			>
				<IconX size="1rem" />
			</Button>
		</Card.Content>
	</Card.Root>
</li>
