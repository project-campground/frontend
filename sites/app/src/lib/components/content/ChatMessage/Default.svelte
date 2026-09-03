<script lang="ts">
	import { UserAvatar } from '$lib/components/users/index.js';
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { GradientText, TextBlock } from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { Datestamp } from '../Datestamp/index.ts';
	import { MessageState } from './types.js';
	import Info from './Info.svelte';

	const {
		createdBy,
		createdAt,
		updatedAt,
		state,
		error,
		children,
	}: {
		createdBy: MessageViewWithReplies['createdBy'];
		updatedAt?: string | null;
		createdAt: string;
		state?: MessageState;
		error?: Error;
		children: Snippet;
	} = $props();
</script>

<UserAvatar
	hideStatus
	did={createdBy.user.did}
	src={createdBy.user.avatar ?? undefined}
/>
<div class="wrapper">
	<div class="header">
		<TextBlock weight={700}>
			<GradientText colors={['var(--foreground-heading)']}>
				{createdBy.nickname ?? createdBy.user.displayName ?? createdBy.user.handle}
			</GradientText>
		</TextBlock>
		<TextBlock
			level="subtext"
			fontSize={0.9}
		>
			<Datestamp date={createdAt} />
		</TextBlock>
		<Info
			{updatedAt}
			{state}
			{error}
		/>
	</div>
	<div class="content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
	}
</style>
