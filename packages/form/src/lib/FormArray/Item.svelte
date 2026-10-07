<script
	lang="ts"
	generics="T"
>
	import { Button, Card } from '@campground/ui';
	import { IconX } from '@tabler/icons-svelte';
	import type { ItemProps } from './props.ts';
	import { getFormArray } from './context.svelte.ts';
	import { setFormControl } from '$lib/FormControl/context.svelte.js';

	const formArray = getFormArray();

	const { item, children }: ItemProps<T> = $props();

	// svelte-ignore state_referenced_locally
	setFormControl(item);
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
				onclick={() => formArray.removeItem(item.key)}
			>
				<IconX size="1rem" />
			</Button>
		</Card.Content>
	</Card.Root>
</li>
