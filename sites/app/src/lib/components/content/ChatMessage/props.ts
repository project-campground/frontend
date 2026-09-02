export interface MessageMenuProps {
	cantToggleReply: boolean;
	pseudoMessage: boolean;
	beingRepliedTo: boolean;
	onOverflow: (event: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }) => unknown;
	toggleReply: () => unknown;
	setEditingMessage: () => unknown;
}
