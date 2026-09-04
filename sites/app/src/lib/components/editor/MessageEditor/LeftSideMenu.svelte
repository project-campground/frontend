<script
	lang="ts"
	module
>
	const messages = defineMessages({
		images: {
			id: 'app.editor.image.add',
			defaultMessage: 'Add image',
			description: 'Button for adding images',
		},
	});
</script>

<script lang="ts">
	import type { defineMessageExtension } from '$lib/editor/extension.js';
	import { FormImageDialog, type FormImageFieldValue } from '@campground/form';
	import { LocaleMessage } from '@campground/locale';
	import { Menu, Modal, MenuPortalInstance, getMenuPortal } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconMountainFilled } from '@tabler/icons-svelte';
	import type { Editor } from 'prosekit/core';

	function createImage(img: FormImageFieldValue) {
		// TODO: Replace fake Markdown (which won't be rendered anyways) into actual editor image component
		editor.commands.insertNode({
			node: editor.schema.nodes.paragraph.create(null, editor.schema.text(img.url ?? 'null')),
		});
	}

	const menuPortal = getMenuPortal();
	const { editor }: { editor: Editor<ReturnType<typeof defineMessageExtension>> } = $props();
</script>

{#snippet imageModal(instance: MenuPortalInstance)}
	<Modal {instance}>
		<FormImageDialog onSubmit={createImage} />
	</Modal>
{/snippet}

<Menu.List>
	<Menu.Item>
		<Menu.Button onclick={(ev) => menuPortal.add(imageModal, ev.currentTarget)}>
			<IconMountainFilled />
			<LocaleMessage {...messages.images} />
		</Menu.Button>
	</Menu.Item>
</Menu.List>
