<script lang="ts">
	import { ComponentDisplay } from '$lib/components/markdown/index.js';
	import Markdown from '$lib/components/markdown/Markdown/Root.svelte';
	import type { MessageViewBasic } from '$lib/types/campground/content.js';

	const {
		createdBy,
		content,
		components,
	}: Pick<MessageViewBasic, 'createdBy' | 'content' | 'components'> = $props();
</script>

{#if content}
	<Markdown value={content}></Markdown>
{/if}
{#each components as component, i (i)}
	<ComponentDisplay
		{component}
		{createdBy}
	/>
{/each}
