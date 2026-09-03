<script lang="ts" module>
	const continuedPostDateDifference = 5 * 60 * 1000;
</script>

<script lang="ts">
	import { getTextTent } from '$lib/components/content/ChatMessage/context.svelte.js';
	import { ChatMessage } from '$lib/components/index.js';
	import { PagePlaceholder, PagePlaceholderIcon, Stack, Divider } from '@campground/ui';
	import DateDivider from './DateDivider.svelte';
	import TentContentEnd from '../TentContentEnd.svelte';

	const textTent = getTextTent();

	const { reachedLastMessages }: { reachedLastMessages: boolean } = $props();
</script>

<Stack
	direction="column-reverse"
	flex={1}
	gap={0}
>
	{#each textTent.messages as message, i (message.key)}
		{const previousMessage = $derived(textTent.messages[i + 1])}
		{const postDifference = $derived(previousMessage ? new Date(message.createdAt).getTime() - new Date(previousMessage.createdAt).getTime() : 0)}
		{const sameDate = $derived(previousMessage && new Date(previousMessage.createdAt).toDateString() === new Date(message.createdAt).toDateString())}
		<ChatMessage
			{message}
			continuousMessage={sameDate && !message.replyingToCount && postDifference < continuedPostDateDifference}
			state={message.state}
			error={message.stateMessage}
		/>
		{#if previousMessage && !sameDate}
			<DateDivider date={new Date(message.createdAt)} />
		{/if}
	{/each}
</Stack>
{#if reachedLastMessages}
	<TentContentEnd />
{/if}