<script lang="ts">
	import { Code, Select } from '@campground/ui';
	import type { SvelteNodeViewProps } from 'prosekit/svelte';
	import hljs from 'highlight.js';

	const { setAttrs, contentRef }: SvelteNodeViewProps = $props();

	let code: HTMLElement | undefined = $state();

	$effect(() => {
		if (code) contentRef(code);
	});
</script>

<Code.Block bind:codeElement={code}>
	{#snippet meta()}
		<Select.Button onChange={(lang) => setAttrs({ lang: lang === 'plain' ? undefined : lang })}>
			{#snippet display(value)}
				{#if value === 'plain' || !value}
					(Not formatted)
				{:else if value}
					{hljs.getLanguage(value as string)?.name}
				{/if}
			{/snippet}
			<Select.Option value={'plain'}>Plain text</Select.Option>
			{#each hljs.listLanguages() as lang (lang)}
				<Select.Option value={lang}>
					{hljs.getLanguage(lang)?.name}
				</Select.Option>
			{/each}
			<Select.Option value="javascript">JavaScript</Select.Option>
		</Select.Button>
	{/snippet}
</Code.Block>
