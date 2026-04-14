import HTTPClientObjectManager from "./base";
import type { GetTentsOutput, TentViewDetailed } from "types/campground/tent";
import type { MessageViewBasic } from "types/campground/content";

export default class HTTPClientTentManager extends HTTPClientObjectManager {
    getMany(campsite_id: string, bonfire_id: string) {
        return this.client.get<GetTentsOutput>({
            route: "gg.campground.tent.getTents",
            queries: { campsite_id, bonfire_id, },
        });
    }
    
    get(tent_id: string) {
        return this.client.get<TentViewDetailed>({
            route: "gg.campground.tent.getTent",
            queries: { tent_id, },
        });
    }
    
    create(campsite_id: string, bonfire_id: string, body: { type: number; name: string; description: string; position: number; }) {
        return this.client.post<TentViewDetailed>({
            route: "gg.campground.tent.createTent",
            queries: { campsite_id, bonfire_id, },
            body: { viewType: 0, ...body },
        });
    }
    
    update(tent_id: string, body: { name?: string; description?: string; viewType?: number; }) {
        return this.client.post<TentViewDetailed>({
            route: "gg.campground.tent.updateTent",
            queries: { tent_id, },
            body,
        });
    }
    
    move(tent_id: string, body: { bonfireId?: string | null; categoryId?: string | null; position?: number; }) {
        return this.client.post<TentViewDetailed>({
            route: "gg.campground.tent.moveTent",
            queries: { tent_id, },
            body,
        });
    }
    
    delete(tent_id: string) {
        return this.client.post<MessageViewBasic>({
            route: "gg.campground.tent.deleteTent",
            queries: { tent_id, },
        });
    }
}