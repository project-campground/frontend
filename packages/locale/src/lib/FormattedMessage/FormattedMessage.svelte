<script lang="ts">
	import type FormattedMessageProps from './props.ts';
	import { getLocaleContext } from '$lib/context.js';
	import type { IntlShape } from '@formatjs/svelte-intl';
	import type { DefaultMessageSegment } from './props.ts';

	// Custom reactive context
	const localeContext = getLocaleContext();

	let intl = $derived<IntlShape<DefaultMessageSegment>>($localeContext);

	const { id, defaultMessage, description, values }: FormattedMessageProps = $props();

	const formattedValue = $derived(intl?.formatMessage({ id, defaultMessage, description }, values));

	const arrayValue: DefaultMessageSegment[] = $derived(
		Array.isArray(formattedValue) ? formattedValue : [formattedValue]
	);
</script>

{#each arrayValue as segment}
	{#if typeof segment === 'string'}
		{@html segment}
	{:else}
		{@render segment()}
	{/if}
{/each}
