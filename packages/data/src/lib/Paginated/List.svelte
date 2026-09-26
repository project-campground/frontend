<script lang="ts">
	import { Button, Group, TextBlock } from '@campground/ui';
	import type { ListProps } from './props.ts';
	import { IconCaretLeftFilled, IconCaretRightFilled } from '@tabler/icons-svelte';

	let { count, current = $bindable(0) }: ListProps = $props();

	const atTheBeginning = $derived(!current);
	const atTheEnd = $derived(Boolean(count) && current + 1 >= count!);
</script>

<Group>
	<Button
		variant="soft"
		color="neutral"
		padding="equal"
		disabled={atTheBeginning}
		onclick={() => current--}
	>
		<IconCaretLeftFilled size="1rem" />
	</Button>
	{#if !atTheBeginning}
		<Button
			variant="soft"
			color="neutral"
			onclick={() => (current = 0)}
		>
			1
		</Button>
		{#if current > 1}
			<TextBlock>...</TextBlock>
		{/if}
	{/if}
	<Button
		variant="selected"
		color="neutral"
	>
		{current + 1}
	</Button>
	{#if count && current + 1 < count!}
		{#if count && count - 2 !== current}
			<TextBlock>...</TextBlock>
		{/if}
		<Button
			variant="soft"
			color="neutral"
			onclick={() => (current = count - 1)}
		>
			{count}
		</Button>
	{/if}
	<Button
		variant="soft"
		color="neutral"
		padding="equal"
		disabled={atTheEnd}
		onclick={() => current++}
	>
		<IconCaretRightFilled size="1rem" />
	</Button>
</Group>
