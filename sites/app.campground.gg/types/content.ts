import { ProfileView } from "./user";

export interface TentMessageView<T> {
    id: string;
    campsiteId: string;
    bonfireId: string;
    tentId: string;

    content: string;
    replyingTo: T[];

    createdBy: ProfileView;
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