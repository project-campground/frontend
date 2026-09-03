<script lang="ts">
	import { TextBlock } from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { Datestamp } from '../Datestamp/index.ts';

	const { createdAt, children }: { createdAt: string; children: Snippet } = $props();
</script>

<div class="container">
	<div class="content">
		{@render children()}
	</div>
	<div class="meta">
		<TextBlock level="subtext">
			<Datestamp date={createdAt} />
		</TextBlock>
	</div>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
		grid-column: 1 / 3;
	}
</style>
