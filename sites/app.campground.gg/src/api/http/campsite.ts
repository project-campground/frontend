import type { CampsiteViewBasic, CampsiteViewDetailed } from "types/campground/campsites";
import HTTPBackendObjectManager from "./base-backend";

export default class HTTPCampsiteManager extends HTTPBackendObjectManager {
    public get(campsite_id: string) {
        return this.client.get<CampsiteViewDetailed>({
            route: "gg.campground.campsite.getCampsite",
            queries: { campsite_id },
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