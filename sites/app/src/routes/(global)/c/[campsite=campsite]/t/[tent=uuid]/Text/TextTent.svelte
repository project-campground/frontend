<script lang="ts">
	import { Stack } from '@campground/ui';
	import TentWrapper from '../../../TentWrapper.svelte';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { IconHash } from '@tabler/icons-svelte';
	import MessageEditor from '$lib/components/editor/MessageEditor.svelte';
	import MessageScroller from './MessageScroller.svelte';
	import { getAppview } from '$lib/context/api.js';

	const { tent }: { tent: TentViewBasic } = $props();

	const appview = getAppview();

	async function createMessage(content: string, replies: string[]) {
		return appview.messages.create(tent.id, { content, replies });
	}
</script>

<TentWrapper>
	{#snippet icon()}
		<IconHash />
	{/snippet}
	{#snippet title()}
		{tent?.name}
	{/snippet}
	<div class="content">
		<Stack
			direction="column-reverse"
			flex={1}
		>
			<svelte:boundary>
				{#snippet pending()}
					Loading messages...
				{/snippet}
				{#snippet failed(err)}
					Err: {err}
				{/snippet}
				<MessageScroller tentId={tent.id} />
			</svelte:boundary>
		</Stack>
	</div>
	<div class="input">
		<MessageEditor
			onSubmit={createMessage}
			tentName={tent.name}
		/>
	</div>
</TentWrapper>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column-reverse;
		padding: 0.5rem 0;

		flex: 1;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.input {
		padding-inline: 1rem;
		padding-block-end: 1rem;
	}
</style>
