<script
	lang="ts"
	module
>
	interface Props {
		tentName?: string;
		defaultValue?: string;
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
	import { deserializeMarkdown, serializeMarkdown } from '$lib/editor/mdast/markdown.js';
	import { editorRootToMdast } from '$lib/editor/mdast/editor-to-markdown.js';
	import { IconSend2 } from '@tabler/icons-svelte';
	import { ProseKit } from 'prosekit/svelte';
	import { defineMessage } from '@formatjs/svelte-intl';
	import { getLocale } from '@campground/locale';
	import { mdastRootToEditor } from '$lib/editor/mdast/markdown-to-editor.js';

	const { tentName: tent, defaultValue, onSubmit, onCancel }: Props = $props();

	const intl = getLocale();
	const extension = $derived(
		defineMessageExtension(
			submitMessage,
			onCancel,
			tent ? (intl.formatMessage(placeholder, { tent }) as string) : '',
		),
	);
	const editor = $derived(createEditor({ extension }));

	$effect(() => {
		if (defaultValue) editor.setContent(mdastRootToEditor(deserializeMarkdown(defaultValue)));
	});

	function submitMessage() {
		const value = serializeMarkdown(editorRootToMdast(editor.getDocJSON()));

		onSubmit?.(value);
		editor.setContent({ type: 'root', content: [{ type: 'paragraph', content: [] }] });
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
			<span class="mobile-only">
				<Button
					onclick={submitMessage}
					variant="plain"
					color="neutral"
					padding="equal"
				>
					<IconSend2 />
				</Button>
			</span>
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
	.mobile-only {
		@include desktop-sm-up {
			display: none;
		}
	}
</style>
