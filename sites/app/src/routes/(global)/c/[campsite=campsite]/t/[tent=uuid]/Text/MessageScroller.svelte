<script lang="ts">
	import { ChatMessage } from '$lib/components/content/ChatMessage/index.js';
	import { getAppview } from '$lib/context/api.js';
	// import type { MessageViewWithReplies } from '$lib/types/campground/content.js';

	const appview = getAppview();
	// const messages: MessageViewWithReplies[] = $state([]);

	const { tentId }: { tentId: string } = $props();

	const messages = $derived(
		await appview.messages.getMany(tentId, 0, 50).then((value) => value.messages),
	);
</script>

{#each messages as message (message.id)}
	<ChatMessage {message} />
{/each}
