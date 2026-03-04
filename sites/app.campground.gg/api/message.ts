import HTTPClientObjectManager from "./base";
import type { GetTentMessagesOutput, TentMessageViewBasic } from "types/content";

export default class HTTPClientMessageManager extends HTTPClientObjectManager {
    getMany(tent_id: string, offset: number = 0, limit: number = 50) {
        return this.client.get<GetTentMessagesOutput>({
            route: "gg.campground.tent.getMessages",
            queries: { tent_id, offset, limit, },
        });
    }
    
    create(tent_id: string, body: { content: string; replies?: string[]; }) {
        return this.client.post<TentMessageViewBasic>({
            route: "gg.campground.tent.createMessage",
            queries: { tent_id, },
            body,
        });
    }
    
    update(tent_id: string, message_id: string, body: { content: string; }) {
        return this.client.post<TentMessageViewBasic>({
            route: "gg.campground.tent.updateMessage",
            queries: { tent_id, message_id, },
            body,
        });
    }

    delete(tent_id: string, message_id: string) {
        return this.client.post<TentMessageViewBasic>({
            route: "gg.campground.tent.deleteMessage",
            queries: { tent_id, message_id, },
        });
    }
}