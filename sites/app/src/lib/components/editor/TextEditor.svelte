<script lang="ts">
	import { useEditor } from 'prosekit/svelte';

	const editor = useEditor();
</script>

<div
	class="container"
	{@attach $editor.mount}
	spellcheck="true"
></div>

<style lang="scss">
	@use '../../css/markdown.scss' as *;

	.container {
		position: relative;
		box-sizing: border-box;
		padding: 0.5rem 1rem;

		overflow-x: hidden;
		overflow-y: auto;

		outline: none;

		flex: 1;
		width: 100%;
		height: 100%;

		@extend %MarkdownContent-basic;

		:global([data-node-view-content='true']),
		:global([data-node-view-root='true']) {
			display: contents;
		}

		:global(.prosekit-placeholder) {
			&::before {
				position: absolute;
				height: 0;
				color: var(--foreground-background);
				cursor: text;
				content: attr(data-placeholder);
			}
		}
	}
</style>
