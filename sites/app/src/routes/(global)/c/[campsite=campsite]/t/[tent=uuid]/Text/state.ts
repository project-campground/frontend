import { MessageState, type MessageViewInChat } from '$lib/components/index.js';
import type { MessageViewWithReplies } from '$lib/types/campground/content.js';

export function giveMessageState(value: MessageViewWithReplies): MessageViewInChat {
	return { ...value, key: value.id, state: MessageState.Loaded };
}
