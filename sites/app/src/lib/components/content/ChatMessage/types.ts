import type { MessageViewWithReplies } from '$lib/types/campground/content.js';

export enum MessageState {
	Creating = 1,
	Created = 2,
	Failed = 3,
}

export interface MessageViewInChat extends MessageViewWithReplies {
	key?: string;
	state?: MessageState;
	stateMessage?: Error;
}
