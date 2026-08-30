<script lang="ts">
	import { UserAvatar } from '$lib/components/users/index.js';
	import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
	import { GradientText, TextBlock } from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { Datestamp } from '../Datestamp/index.ts';

	const {
		createdBy,
		createdAt,
		children,
	}: { createdBy: MessageViewWithReplies['createdBy']; createdAt: string; children: Snippet } =
		$props();
</script>

<UserAvatar
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
			<Datestamp
				when
				date={createdAt}
			/>
		</TextBlock>
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
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1ch;
	}
</style>
