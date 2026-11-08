import type { MessageViewWithReplies } from '#lib/types/campground/content.js';

export interface RootProps {
	tentName?: string;
	defaultValue?: string;
	onCancel?: () => unknown;
	onSubmit?: (content: string) => unknown;
}
export interface ReplyProps {
	message: MessageViewWithReplies;
	onRemove?: () => unknown;
}
