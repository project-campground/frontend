<script
	lang="ts"
	module
>
	const tooltipMessages = defineMessages({
		info: { id: `form.array.button.info`, defaultMessage: `Adds another {entry}` },
		max: {
			id: `form.array.button.maxError`,
			defaultMessage: `The field has reached the max capacity of {entries}`,
		},
	});
</script>

<script lang="ts">
	import { Button, getMenuPortal, tooltip, type ButtonProps } from '@campground/ui';
	import { IconPlus } from '@tabler/icons-svelte';
	import { getArrayField } from './context.svelte.js';
	import type { Snippet } from 'svelte';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { getLocale } from '@campground/locale';

	let {
		children,
		entry,
		entries,
		...attributes
	}: Omit<ButtonProps, 'children'> & { entry: string; entries: string; children?: Snippet } =
		$props();

	const menuPortal = getMenuPortal();
	const arrayField = getArrayField();
	const max = $derived(arrayField.max);
	const isOverMax = $derived(Boolean($max && arrayField.controls.length >= $max));
	const locale = getLocale();
</script>

<Button
	variant="soft"
	color="neutral"
	padding="equal"
	size="xs"
	onclick={() => arrayField.addItem()}
	{@attach tooltip(
		menuPortal,
		isOverMax ?
			locale.formatMessage(tooltipMessages.max, { entries })
		:	locale.formatMessage(tooltipMessages.info, { entry }),
	)}
	disabled={isOverMax}
	{...attributes}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlus />
	{/if}
</Button>
