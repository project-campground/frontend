<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children?: Snippet } = $props();
</script>

<div class="container">
	{@render children?.()}
</div>

<style lang="scss">
	@use '../../css/markdown.scss' as *;

	.container {
		text-wrap: wrap;
		line-break: normal;
		@extend %MarkdownContent-basic;
	}
</style>
