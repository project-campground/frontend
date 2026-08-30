<script
	lang="ts"
	module
>
	interface Props {
		placeholder?: string;
		submitType?: 'post' | 'update';
		onCancel?: () => unknown;
		onSubmit?: (content: string, replies: string[]) => unknown;
	}
</script>

<script lang="ts">
	import { Button, Card, Group } from '@campground/ui';
	import TextEditor from './TextEditor.svelte';
	import { createEditor } from 'prosekit/core';
	import { definePostExtension } from '$lib/editor/extension.js';
	import { serializeMarkdown } from '$lib/editor/mdast/markdown.js';
	import { editorRootToMdast } from '$lib/editor/mdast/editor-to-markdown.js';
	import { IconSend2 } from '@tabler/icons-svelte';
	import { ProseKit } from 'prosekit/svelte';

	const { placeholder, onSubmit }: Props = $props();

	const extension = $derived(definePostExtension(placeholder));
	const editor = $derived(createEditor({ extension }));

	function submitMessage() {
		return onSubmit?.(serializeMarkdown(editorRootToMdast(editor.getDocJSON())), []);
	}
</script>

<Card.Root
	direction="row"
	size="xs"
>
	<Group>
		<div class="editor">
			<ProseKit {editor}>
				<TextEditor></TextEditor>
			</ProseKit>
		</div>
		<aside class="buttons">
			<Button
				onclick={submitMessage}
				variant="plain"
				color="neutral"
				padding="equal"
			>
				<IconSend2 />
			</Button>
		</aside>
	</Group>
</Card.Root>

<style lang="scss">
	@use '@campground/ui' as *;

	.editor {
		flex: 1;
		max-height: 16rem;
		overflow: auto;
	}
</style>
