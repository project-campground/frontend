import type { GetInvitesOutput } from "types/campground/invites";
import type { CampsiteInviteViewDetailed } from "types/campground/invites";
import type { CampsiteInviteViewBasic } from "types/campground/invites";
import HTTPBackendObjectManager from "./base-backend";

export default class HTTPInviteManager extends HTTPBackendObjectManager {
    get(invite_id: string) {
        return this.client.get<CampsiteInviteViewDetailed>({
            route: "gg.campground.invite.getInvite",
            queries: {
                invite_id,
            },
        });
    }

    getMany(campsite_id: string, offset: number = 0, limit: number = 50) {
        return this.client.get<GetInvitesOutput>({
            route: "gg.campground.invite.getInvites",
            queries: {
                campsite_id,
                offset,
                limit,
            },
        });
    }
    
    use(invite_id: string) {
        return this.client.post<null>({
            route: "gg.campground.invite.useInvite",
            queries: {
                invite_id,
            },
        });
    }
    
    create(campsite_id: string, body: Pick<CampsiteInviteViewBasic, "allowedAmount" | "expiresAt">) {
        return this.client.post<CampsiteInviteViewBasic>({
            route: "gg.campground.invite.createInvite",
            queries: {
                campsite_id,
            },
            body,
        });
    }
    
    delete(campsite_id: string, invite_id: string) {
        return this.client.post<CampsiteInviteViewBasic>({
            route: "gg.campground.invite.deleteInvite",
            queries: {
                campsite_id,
                invite_id,
            },
        });
    }
}