<script
	lang="ts"
	module
>
	interface Props {
		tentName?: string;
		submitType?: 'post' | 'update';
		onCancel?: () => unknown;
		onSubmit?: (content: string) => unknown;
	}
	const placeholder = defineMessage({
		id: 'app.tents.text.placeholder',
		defaultMessage: 'Message #{tent}',
		description: 'The placeholder for message editor in text tents',
	});
</script>

<script lang="ts">
	import { Button, Card, Group } from '@campground/ui';
	import TextEditor from './TextEditor.svelte';
	import { createEditor } from 'prosekit/core';
	import { defineMessageExtension } from '$lib/editor/extension.js';
	import { serializeMarkdown } from '$lib/editor/mdast/markdown.js';
	import { editorRootToMdast } from '$lib/editor/mdast/editor-to-markdown.js';
	import { IconSend2 } from '@tabler/icons-svelte';
	import { ProseKit } from 'prosekit/svelte';
	import { defineMessage } from '@formatjs/svelte-intl';
	import { getLocaleContext } from '@campground/locale';

	const { tentName: tent, onSubmit }: Props = $props();

	const intl = getLocaleContext();
	const extension = $derived(
		defineMessageExtension(submitMessage, $intl.formatMessage(placeholder, { tent })),
	);
	const editor = $derived(createEditor({ extension }));

	function submitMessage() {
		onSubmit?.(serializeMarkdown(editorRootToMdast(editor.getDocJSON())));
		editor.setContent({ type: 'root', content: [{ type: 'paragraph', content: [] }] });
		console.log('Editor json', editor.getDocJSON());
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
