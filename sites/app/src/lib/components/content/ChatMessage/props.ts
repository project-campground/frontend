import type { MessageViewBasic } from '$lib/types/campground/content.js';

export interface MessageMenuProps {
	cantToggleReply: boolean;
	pseudoMessage: boolean;
	beingRepliedTo: boolean;
	messageType: MessageViewBasic['type'];
	onOverflow: (event: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }) => unknown;
	toggleReply: () => unknown;
	setEditingMessage: () => unknown;
	deleteMessage: () => unknown;
}
