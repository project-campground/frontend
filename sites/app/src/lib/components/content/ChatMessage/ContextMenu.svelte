<script lang="ts">
	import { Menu } from '@campground/ui';
	import type { MessageMenuProps } from './props.ts';
	import { IconArrowBackUp, IconPencilFilled, IconTrashFilled } from '@tabler/icons-svelte';
	import { LocaleMessage } from '@campground/locale';
	import { localeStrings } from '$lib/locale/index.js';

	const {
		beingRepliedTo,
		toggleReply,
		setEditingMessage,
		deleteMessage,
		messageType,
		cantToggleReply,
		pseudoMessage,
	}: Omit<MessageMenuProps, 'onOverflow'> = $props();
</script>

<Menu.List>
	<Menu.Item>
		<Menu.Button
			onclick={toggleReply}
			disabled={cantToggleReply}
		>
			<IconArrowBackUp />
			<LocaleMessage
				{...beingRepliedTo ? localeStrings.messages.removeReply : localeStrings.messages.addReply}
			/>
		</Menu.Button>
	</Menu.Item>
	<Menu.Item>
		<Menu.Button
			onclick={setEditingMessage}
			disabled={pseudoMessage || messageType === 'system'}
		>
			<IconPencilFilled />
			<LocaleMessage {...localeStrings.messages.edit} />
		</Menu.Button>
	</Menu.Item>
	<Menu.Item>
		<Menu.Button
			color="danger"
			onclick={deleteMessage}
		>
			<IconTrashFilled />
			<LocaleMessage {...localeStrings.messages.delete} />
		</Menu.Button>
	</Menu.Item>
</Menu.List>
