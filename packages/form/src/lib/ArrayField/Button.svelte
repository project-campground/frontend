<script lang="ts">
	import { Button, type ButtonProps } from '@campground/ui';
	import { IconPlus } from '@tabler/icons-svelte';
	import { getArrayField } from './context.svelte.ts';
	import type { Snippet } from 'svelte';

	let { children, ...attributes }: Omit<ButtonProps, 'children'> & { children?: Snippet } = $props();

	const arrayField = getArrayField();
	const max = $derived(arrayField.max);
</script>

<Button
	variant="soft"
	color="neutral"
	padding="equal"
	size="xs"
	onclick={() => arrayField.addItem()}
	{...attributes}
	disabled={Boolean($max && arrayField.controls.length >= $max)}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlus />
	{/if}
</Button>
