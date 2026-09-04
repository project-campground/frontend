<script
	lang="ts"
	generics="T"
>
	import { FormControl } from '$lib/FormControl/index.js';
	import { Button, Card } from '@campground/ui';
	import { IconX } from '@tabler/icons-svelte';
	import type { FormArrayItemProps } from './props.ts';

	const { id, value, children, size, level }: FormArrayItemProps<T> = $props();
</script>

<li>
	<Card.Root
		direction="row"
		{size}
		{level}
		align="center"
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
				variant="plain"
				color="neutral"
				padding="equal"
				size="sm"
				type="button"
			>
				<IconX size="1.5rem" />
			</Button>
		</Card.Content>
	</Card.Root>
</li>
