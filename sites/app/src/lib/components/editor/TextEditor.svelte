<script lang="ts">
	import type { Editor } from 'prosekit/core';

	const { editor }: { editor: Editor } = $props();
</script>

<div
	class="container"
	{@attach editor.mount}
	spellcheck="true"
></div>

<style lang="scss">
	@use '../../css/markdown.scss' as *;

	.container {
		position: relative;
		padding: 0.25rem 0.75rem;

		overflow-x: hidden;
		overflow-y: auto;

		outline: none;

		flex: 1;
		width: 100%;
		height: 100%;
		@extend %MarkdownContent-basic;
	}
</style>
