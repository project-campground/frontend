<script lang="ts">
	import { getTextTent } from '$lib/components/content/ChatMessage/context.svelte.js';
	import { ChatMessage, MessageState, type MessageViewInChat } from '$lib/components/index.js';
	import { getAppview } from '$lib/context/api.js';
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';

	const { tent }: { tent: TentViewBasic } = $props();
	const textTent = getTextTent();
	const appview = getAppview();

	$effect(() => {
		textTent.messages = [];
		appview.messages
			.getMany(tent.id, 0, 50)
			.then((value) => (textTent.messages = value.messages.map(modifyMessage)));
	});

	function modifyMessage(value: MessageViewWithReplies): MessageViewInChat {
		return { ...value, key: value.id, state: MessageState.Loaded };
	}
</script>

{#each textTent.messages as message (message.key)}
	<ChatMessage
		{message}
		state={message.state}
		error={message.stateMessage}
	/>
{/each}
