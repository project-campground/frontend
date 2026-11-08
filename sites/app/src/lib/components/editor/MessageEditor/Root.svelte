<script
	lang="ts"
	module
>
	const placeholder = defineMessage({
		id: 'app.tents.text.placeholder',
		defaultMessage: 'Message #{tent}',
		description: 'The placeholder for message editor in text tents',
	});
</script>

<script lang="ts">
	import {
		Button,
		Card,
		Divider,
		getMenuPortal,
		Group,
		Menu,
		MenuPortalInstance,
	} from '@campground/ui';
	import TextEditor from '../TextEditor.svelte';
	import { createEditor } from 'prosekit/core';
	import { defineMessageExtension } from '#lib/editor/extension.js';
	import { deserializeMarkdown, serializeMarkdown } from '#lib/editor/mdast/markdown.js';
	import { editorRootToMdast } from '#lib/editor/mdast/editor-to-markdown.js';
	import { IconPlus, IconSend2 } from '@tabler/icons-svelte';
	import { ProseKit } from 'prosekit/svelte';
	import { defineMessage } from '@formatjs/svelte-intl';
	import { getLocale } from '@campground/locale';
	import { mdastRootToEditor } from '#lib/editor/mdast/markdown-to-editor.js';
	import LeftSideMenu from './LeftSideMenu.svelte';
	import { getTextTent } from '#lib/components/content/ChatMessage/context.svelte.js';
	import type { RootProps } from './props.ts';

	const { tentName: tent, defaultValue, onSubmit, onCancel }: RootProps = $props();

	const intl = getLocale();
	const menu = getMenuPortal();
	const textTent = getTextTent();
	const extension = $derived(
		defineMessageExtension(
			submitMessage,
			onCancel,
			() => textTent.setEditingPreviousMessage(),
			() => textTent.setEditingNextMessage(),
			tent ? (intl.formatMessage(placeholder, { tent }) as string) : '',
		),
	);
	const editor = $derived(createEditor({ extension }));

	$effect(() => {
		if (!defaultValue) return;

		const mdastNodes = deserializeMarkdown(defaultValue);
		const editorNodes = mdastRootToEditor(mdastNodes);
		editor.setContent(editorNodes);
	});

	function submitMessage() {
		const value = serializeMarkdown(editorRootToMdast(editor.getDocJSON()));

		onSubmit?.(value);
		editor.setContent({ type: 'root', content: [{ type: 'paragraph', content: [] }] });
	}
</script>

{#snippet leftSideMenu(instance: MenuPortalInstance<Event>)}
	<Menu.Root
		{instance}
		placement="top"
	>
		<LeftSideMenu {editor} />
	</Menu.Root>
{/snippet}

<Card.Root
	direction="row"
	size="xs"
	gap={0}
	align="stretch"
	wrap="nowrap"
>
	<Group
		class="MessageEditor buttons left"
		align="stretch"
		gap={0.5}
		wrap="nowrap"
	>
		<Button
			variant="plain"
			color="neutral"
			padding="equal"
			onclick={(ev) => menu.add(leftSideMenu, ev.currentTarget)}
		>
			<IconPlus />
		</Button>
		<Divider orientation="vertical" />
	</Group>
	<Group flex={1}>
		<div class="editor">
			<ProseKit {editor}>
				<TextEditor></TextEditor>
			</ProseKit>
		</div>
	</Group>
	<Group
		class="MessageEditor buttons right"
		wrap="nowrap"
	>
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
