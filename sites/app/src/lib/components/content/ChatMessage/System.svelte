<script lang="ts">
	import { TextBlock } from '@campground/ui';
	import type { Snippet } from 'svelte';
	import { Datestamp } from '../Datestamp/index.ts';

	const { createdAt, children }: { createdAt: string; children: Snippet } = $props();
</script>

<div class="container">
	<span class="content">
		{@render children()}
	</span>
	<span class="meta">
		<TextBlock level="subtext">
			<Datestamp date={createdAt} />
		</TextBlock>
	</span>
</div>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		grid-column: 1 / 3;
	}
	.content {
		vertical-align: middle;
	}
	.meta {
		vertical-align: bottom;
		padding-inline-start: 0.5rem;
	}
</style>
