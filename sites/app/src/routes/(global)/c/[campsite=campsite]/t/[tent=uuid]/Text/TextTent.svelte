<script lang="ts">
	import { Stack } from '@campground/ui';
	import TentWrapper from '../../../TentWrapper.svelte';
	import type { TentViewBasic } from '$lib/types/campground/tent.js';
	import { IconHash } from '@tabler/icons-svelte';
	import MessageEditor from '$lib/components/editor/MessageEditor.svelte';

	const { tent }: { tent: TentViewBasic | null } = $props();
</script>

<TentWrapper>
	{#snippet icon()}
		<IconHash />
	{/snippet}
	{#snippet title()}
		{tent?.name}
	{/snippet}
	<Stack
		direction="column-reverse"
		flex={1}>asdasdasdasd</Stack
	>
	<div class="input">
		<MessageEditor />
	</div>
</TentWrapper>

<style lang="scss">
	.input {
		padding-inline: 1rem;
		padding-block-end: 1rem;
	}
</style>
