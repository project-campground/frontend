<script lang="ts">
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import Default from './Default.svelte';
	import System from './System.svelte';

	const { message }: { message: MessageViewWithReplies } = $props();
</script>

<div
	class="container"
	data-message-id={message.id}
	data-tent-id={message.tentId}
	data-campsite-id={message.campsiteId}
	data-bonfire-id={message.bonfireId}
>
	<div class="wrapper">
		{#if message.type === 'system'}
			<System createdAt={message.createdAt}>
				{message.content}
			</System>
		{:else}
			<Default
				createdBy={message.createdBy}
				createdAt={message.createdAt}
			>
				{message.content}
			</Default>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: column;
		transition: background $transition-time-md;
		&:hover {
			background-color: var(--background-content);
		}
	}
	.wrapper {
		display: flex;
		flex-direction: row;
		padding: 0.5rem 1.5rem;
		gap: 1rem;
	}
</style>
