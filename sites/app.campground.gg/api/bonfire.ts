import type { BonfireViewBasic, BonfireViewDetailed } from "types/campsites";
import HTTPClientObjectManager from "./base";

export default class HTTPClientBonfireManager extends HTTPClientObjectManager {
    public get(campsite_id: string, bonfire_id: string) {
        return this.client.get<BonfireViewDetailed>({
            route: "gg.campground.campsite.getBonfire",
            queries: { campsite_id, bonfire_id, },
        });
    }

    public create(campsite_id: string, body: { name: string, description: string; position: number; }) {
        return this.client.post<BonfireViewDetailed>({
            route: "gg.campground.campsite.createBonfire",
            queries: { campsite_id },
            body,
        });
    }

    public update(campsite_id: string, bonfire_id: string, body: { name?: string, description?: string; position?: number; avatarUri?: string; bannerUri?: string; }) {
        return this.client.post<BonfireViewBasic>({
            route: "gg.campground.campsite.updateBonfire",
            queries: { campsite_id, bonfire_id },
            body,
        });
    }

    public delete(campsite_id: string, bonfire_id: string) {
        return this.client.post<BonfireViewBasic>({
            route: "gg.campground.campsite.deleteBonfire",
            queries: { campsite_id, bonfire_id },
        });
    }
}