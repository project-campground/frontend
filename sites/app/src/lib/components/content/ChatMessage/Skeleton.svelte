<script lang="ts">
	import MarkdownFormatted from '$lib/components/markdown/Markdown/Formatted.svelte';
	import { Avatar, loremIpsum, Skeleton, TextBlock, Threaded } from '@campground/ui';
	import Wrapper from './Wrapper.svelte';
	import Container from './Container.svelte';

	const { index }: { index?: number } = $props();
	const indexWithFallback = $derived(index ?? 0);
</script>

<Container>
	<Threaded.Root direction="to-top">
		{#snippet parent()}
			<Wrapper>
				<div class="avatar">
					<Skeleton radius="avatar">
						<Avatar size="sm" />
					</Skeleton>
				</div>
				<div class="message">
					<div class="header">
						<TextBlock>
							<Skeleton>Example user</Skeleton>
						</TextBlock>
						<TextBlock fontSize={0.9}>
							<Skeleton>7 hours ago</Skeleton>
						</TextBlock>
					</div>
					<div class="content">
						<MarkdownFormatted>
							<p><Skeleton>{indexWithFallback % 2 === 1 ? loremIpsum.sm : loremIpsum.md}</Skeleton></p>
							{#if indexWithFallback % 5 < 3}
								<p>
									<Skeleton>{loremIpsum.lg}</Skeleton>
								</p>
							{/if}
							{#if indexWithFallback % 7 > 2}
								<p><Skeleton>{indexWithFallback % 2 === 1 ? loremIpsum.lg : loremIpsum.md}</Skeleton></p>
							{/if}
						</MarkdownFormatted>
					</div>
				</div>
			</Wrapper>
		{/snippet}
	</Threaded.Root>
</Container>

<style lang="scss">
	@use '@campground/ui' as *;

	.message {
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
