<script lang="ts">
	import MarkdownFormatted from '$lib/components/markdown/MarkdownFormatted.svelte';
	import { Avatar, loremIpsum, Skeleton, TextBlock, Threaded } from '@campground/ui';

	const { index }: { index?: number } = $props();
	const indexWithFallback = $derived(index ?? 0);
</script>

<div class="container">
	<Threaded.Root direction="to-top">
		{#snippet parent()}
			<div class="wrapper">
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
			</div>
		{/snippet}
	</Threaded.Root>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
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
	.wrapper {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0.5rem;
		padding: 0.25rem 1.5rem;
	}
</style>
