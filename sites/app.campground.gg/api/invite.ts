import HTTPClientObjectManager from "./base";
import type { CampsiteInviteViewBasic, CampsiteInviteViewDetailed, GetInvitesOutput } from "types/membership";

export default class HTTPClientInviteManager extends HTTPClientObjectManager {
    get(invite_id: string) {
        return this.client.get<CampsiteInviteViewDetailed>({
            route: "gg.campground.membership.getInvite",
            queries: {
                invite_id,
            },
        });
    }

    getMany(campsite_id: string, offset: number = 0, limit: number = 50) {
        return this.client.get<GetInvitesOutput>({
            route: "gg.campground.membership.getInvites",
            queries: {
                campsite_id,
                offset,
                limit,
            },
        });
    }
    
    use(invite_id: string) {
        return this.client.post<null>({
            route: "gg.campground.membership.useInvite",
            queries: {
                invite_id,
            },
        });
    }
    
    create(campsite_id: string, body: Pick<CampsiteInviteViewBasic, "allowedAmount" | "expiresAt">) {
        return this.client.post<CampsiteInviteViewBasic>({
            route: "gg.campground.membership.createInvite",
            queries: {
                campsite_id,
            },
            body,
        });
    }
    
    delete(campsite_id: string, invite_id: string) {
        return this.client.post<CampsiteInviteViewBasic>({
            route: "gg.campground.membership.deleteInvite",
            queries: {
                campsite_id,
                invite_id,
            },
        });
    }
}