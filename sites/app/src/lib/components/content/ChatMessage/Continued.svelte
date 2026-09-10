<script lang="ts">
	import { TextBlock } from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { Datestamp } from '../Datestamp/index.ts';
	import { MessageState } from './types.ts';
	import Info from './Info.svelte';

	const {
		createdAt,
		updatedAt,
		state,
		error,
		children,
	}: {
		updatedAt?: string | null;
		createdAt: string;
		state?: MessageState;
		error?: Error;
		children: Snippet;
	} = $props();
</script>

<span class="date">
	<TextBlock
		level="subtext"
		fontSize={0.7}
	>
		<Datestamp
			type="then"
			date={createdAt}
		/>
	</TextBlock>
</span>
<div class="wrapper">
	<div class="content">
		{@render children()}
	</div>
	<Info
		{updatedAt}
		{state}
		{error}
	/>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.wrapper {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 0.25rem;
		flex: 1;
	}
	.date {
		opacity: 0;
		transition: opacity $transition-time-md;
	}
	:global([data-message-id]:hover) .date {
		opacity: 1;
	}
</style>
