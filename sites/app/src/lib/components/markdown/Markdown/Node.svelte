<script lang="ts">
	import type { RootContent } from 'hast';
	import Element from './Element.svelte';

	const { content }: { content: RootContent } = $props();
</script>

{#if content.type === 'element'}
	<Element {content} />
{:else if content.type === 'text'}
	{content.value}
{/if}
