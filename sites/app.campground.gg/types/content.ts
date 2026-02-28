import type { CampsiteMemberViewAuthor } from "./campsites";

export type TentMessageType = "default" | "system";

export type ContentComponentType = "system";
export interface ContentComponentBase<TType extends ContentComponentType> {
    type: TType;
}
export type SystemMessageType = "tentCreated";
interface SystemMessageComponentBase<TMessage extends SystemMessageType> extends ContentComponentBase<"system"> {
    message: TMessage;
}
export interface SystemMessageComponentTentCreated extends SystemMessageComponentBase<"tentCreated"> {
    tentName: string;
}
export type SystemMessageComponent = SystemMessageComponentTentCreated;
export type ContentComponent = SystemMessageComponent;

export interface TentMessageView<T> {
    id: string;
    campsiteId: string;
    bonfireId: string;
    tentId: string;

    type?: TentMessageType;
    content: string;
    replyingTo: T[];
    components?: ContentComponent[];

    createdBy: CampsiteMemberViewAuthor;
    createdAt: string;
    updatedAt?: string | null;
}
export interface TentMessageViewBasic extends TentMessageView<string> {
}
export interface TentMessageViewWithReplies extends TentMessageView<TentMessageViewBasic> {
    replyingToCount: number;
}
export interface GetTentMessagesOutput {
    messages: TentMessageViewWithReplies[];
}