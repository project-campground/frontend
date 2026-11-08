<script
	lang="ts"
	module
>
	const langPrefix = 'language-';
</script>

<script lang="ts">
	import { Chip, Code } from '@campground/ui';

	import type { Element, Text } from 'hast';
	import hljs from 'highlight.js';

	const { content }: { content: Element } = $props();

	const children = $derived(content.children);
	const code = $derived(children[0] as Element);
	// Removes \n from hast
	const value = $derived((code.children[0] as Text).value.slice(0, -1));
	const lines = $derived(value.split('\n'));
	const lang = $derived(
		code.properties.className?.find((x) => x.startsWith(langPrefix))?.slice(langPrefix.length),
	);
	const langDisplayName = $derived(lang ? hljs.getLanguage(lang)?.name : undefined);
</script>

{#snippet languageDisplay()}
	<Chip
		size="sm"
		color="neutral"
	>
		{langDisplayName}
	</Chip>
{/snippet}

<Code.Block meta={langDisplayName ? languageDisplay : undefined}>
	{#each lines as line, i (i)}
		<Code.Line index={i + 1}>{line}</Code.Line>
	{/each}
</Code.Block>
