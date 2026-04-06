import type { CampsiteViewBasic, CampsiteViewDetailed, CreateCampsiteOutput } from "types/campsites";
import HTTPClientObjectManager from "./base";

export default class HTTPClientCampsiteManager extends HTTPClientObjectManager {
    public get(campsite_id: string) {
        return this.client.get<CampsiteViewDetailed>({
            route: "gg.campground.campsite.getCampsite",
            queries: { campsite_id },
        });
    }

    public create(body: { avatar?: string; name: string; description: string; tags: string[]; vanityUrl?: string | null; }) {
        return this.client.post<CreateCampsiteOutput>({
            route: "gg.campground.campsite.createCampsite",
            body,
        });
    }

    public update(campsite_id: string, body: { avatarUri?: string; bannerUri?: string; name?: string; description?: string; tags?: string[]; vanityUrl?: string | null; }) {
        return this.client.post<CampsiteViewBasic>({
            route: "gg.campground.campsite.updateCampsite",
            queries: { campsite_id, },
            body,
        });
    }

    public delete(campsite_id: string) {
        return this.client.post<null>({
            route: "gg.campground.campsite.deleteCampsite",
            queries: { campsite_id, },
        });
    }
}