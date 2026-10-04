<script lang="ts">
	import { Button, type ButtonProps } from '@campground/ui';
	import { IconPlus } from '@tabler/icons-svelte';
	import { getFormArray } from './context.svelte.ts';
	import type { Snippet } from 'svelte';

	let { children, ...attributes }: Omit<ButtonProps, 'children'> & { children?: Snippet } = $props();

	const formArray = getFormArray();
	const max = $derived(formArray.max);
</script>

<Button
	variant="soft"
	color="neutral"
	padding="equal"
	size="sm"
	onclick={() => formArray.addItem()}
	{...attributes}
	disabled={Boolean($max && formArray.itemIds.length >= $max)}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlus />
	{/if}
</Button>
