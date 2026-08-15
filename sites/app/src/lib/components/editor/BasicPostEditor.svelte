<script
	lang="ts"
	module
>
	interface Props {
		submitType?: 'post' | 'update';
		onCancel?: () => unknown;
		onSubmit?: (content: string) => unknown;
	}
</script>

<script lang="ts">
	import { Button } from '@campground/ui';
	import BlockTextEditor from './BlockTextEditor.svelte';
	import TextEditor from './TextEditor.svelte';
	import { createEditor } from 'prosekit/core';
	import { FormattedMessageGlobal } from '@campground/locale';
	import { definePostExtension } from '$lib/editor/extension.js';
	import { serializeMarkdown } from '$lib/editor/mdast/markdown.js';
	import { editorRootToMdast } from '$lib/editor/mdast/editor-to-markdown.js';

	const extension = definePostExtension();
	const editor = createEditor({ extension });

	const { submitType, onSubmit, onCancel }: Props = $props();
</script>

<article class="container">
	<BlockTextEditor {editor}>
		<TextEditor {editor}></TextEditor>
	</BlockTextEditor>
	<footer class="footer">
		<Button
			onclick={() => (
				console.log(editor.getDocJSON()),
				onSubmit?.(serializeMarkdown(editorRootToMdast(editor.getDocJSON())))
			)}
		>
			{#if submitType === 'update'}
				<FormattedMessageGlobal id="common.edit" />
			{:else}
				<FormattedMessageGlobal id="common.create" />
			{/if}
		</Button>
		{#if onCancel}
			<Button
				color="neutral"
				variant="plain"
				onclick={onCancel}
			>
				<FormattedMessageGlobal id="common.cancel" />
			</Button>
		{/if}
	</footer>
</article>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.footer {
		display: flex;
		flex-direction: row-reverse;
	}
</style>
