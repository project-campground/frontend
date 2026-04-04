import HTTPClientObjectManager from "./base";
import type { TentMessagesOutput, MessageViewBasic } from "types/content";

export default class HTTPClientMessageManager extends HTTPClientObjectManager {
    getMany(tent_id: string, offset: number = 0, limit: number = 50) {
        return this.client.get<TentMessagesOutput>({
            route: "gg.campground.message.getMessages",
            queries: { tent_id, offset, limit, },
        });
    }
    
    create(tent_id: string, body: { content: string; replies?: string[]; }) {
        return this.client.post<MessageViewBasic>({
            route: "gg.campground.message.createMessage",
            queries: { tent_id, },
            body,
        });
    }
    
    update(tent_id: string, message_id: string, body: { content: string; }) {
        return this.client.post<MessageViewBasic>({
            route: "gg.campground.message.updateMessage",
            queries: { tent_id, message_id, },
            body,
        });
    }

    delete(tent_id: string, message_id: string) {
        return this.client.post<MessageViewBasic>({
            route: "gg.campground.message.deleteMessage",
            queries: { tent_id, message_id, },
        });
    }
}