<script lang="ts">
	import type { LocaleMessageProps } from './props.ts';
	import { getLocale } from '$lib/context.svelte.js';
	import type { DefaultMessageSegment } from './props.ts';

	// Custom reactive context
	const locale = getLocale();

	const { id, defaultMessage, description, values }: LocaleMessageProps = $props();

	const formattedValue = $derived(locale.formatMessage({ id, defaultMessage, description }, values));

	const arrayValue: DefaultMessageSegment[] = $derived(
		Array.isArray(formattedValue) ? formattedValue : [formattedValue],
	);
</script>

{#each arrayValue as segment}
	{#if typeof segment === 'string'}
		{@html segment}
	{:else}
		{@render segment()}
	{/if}
{/each}
