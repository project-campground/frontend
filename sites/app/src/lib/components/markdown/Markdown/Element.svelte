<script lang="ts">
	import type { Element } from 'hast';
	import Node from './Node.svelte';
	import Code from './Code.svelte';

	const { content }: { content: Element } = $props();

	const tag = $derived(content.tagName);
</script>

{#if tag === 'pre'}
    <Code {content} />
{:else}
    {const attrs = $derived(content.properties)}
    {const children = $derived(content.children)}
	<svelte:element
		this={tag}
		{...attrs as { href?: string }}
	>
		{#each children as content, i (i)}
			<Node {content} />
		{/each}
	</svelte:element>
{/if}
