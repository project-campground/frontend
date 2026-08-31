<script lang="ts">
	import type { ContentComponent, MessageViewWithReplies } from '$lib/types/campground/content.js';
	import System from './System.svelte';

	const {
		component,
		createdBy,
	}: { component: ContentComponent; createdBy: MessageViewWithReplies['createdBy'] } = $props();
</script>

{#if component.type === 'system'}
	<System
		{component}
		{createdBy}
	/>
{/if}
