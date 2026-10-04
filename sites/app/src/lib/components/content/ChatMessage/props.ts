import type { MessageViewBasic, MessageViewWithReplies } from '$lib/types/campground/content.js';
import type { HTMLAttributes } from 'svelte/elements';
import type { MessageState } from './types.ts';

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
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	state?: MessageState;
	continuousMessage?: boolean;
	beingRepliedTo?: boolean;
}
export interface WrapperProps
	extends Pick<ContainerProps, 'state'>, HTMLAttributes<HTMLDivElement> {}
export interface RootProps extends Omit<ContainerProps, 'beingRepliedTo'> {
	message: MessageViewWithReplies;
	error?: Error;
}
