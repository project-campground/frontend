import type { MemberViewAuthor } from './membership.js';

export type TentMessageType = 'default' | 'system';

export type ContentComponentType = 'system';
export interface ContentComponentBase<TType extends ContentComponentType> {
	type: TType;
}
export type SystemMessageType = 'tentCreated' | 'tentNameUpdated';
interface SystemMessageComponentBase<
	TMessage extends SystemMessageType,
> extends ContentComponentBase<'system'> {
	message: TMessage;
}
export interface SystemMessageComponentTentCreated extends SystemMessageComponentBase<'tentCreated'> {
	tentName: string;
}
export interface SystemMessageComponentTentNameUpdated extends SystemMessageComponentBase<'tentNameUpdated'> {
	previousName: string;
	newName: string;
}
export type SystemMessageComponent =
	| SystemMessageComponentTentCreated
	| SystemMessageComponentTentNameUpdated;
export type ContentComponent = SystemMessageComponent;

export interface MessageView<T> {
	id: string;
	campsiteId: string;
	bonfireId: string;
	tentId: string;

	type?: TentMessageType;
	content: string;
	replyingTo: T[];
	components?: ContentComponent[];

	createdBy: MemberViewAuthor;
	createdAt: string;
	updatedAt?: string | null;
}
export interface MessageViewBasic extends MessageView<string> {}
export interface MessageViewWithReplies extends MessageView<MessageViewBasic> {
	replyingToCount: number;
}
export interface TentMessagesOutput {
	messages: MessageViewWithReplies[];
}
