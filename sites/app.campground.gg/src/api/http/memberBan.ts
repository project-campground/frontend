import type { MemberBanView, GetBansOutput } from "types/campground/membership";
import HTTPBackendObjectManager from "./base-backend";

export default class HTTPMemberBanManager extends HTTPBackendObjectManager {
    getMany(campsite_id: string, offset: number = 0, limit: number = 50) {
        return this.client.get<GetBansOutput>({
            route: "gg.campground.membership.getMemberBans",
            queries: {
                campsite_id,
                offset,
                limit,
            },
        });
    }
    
    create(campsite_id: string, actor: string, body: { reason: string; }) {
        console.log({ campsite_id, actor });
        return this.client.post<MemberBanView>({
            route: "gg.campground.membership.banMember",
            queries: {
                campsite_id,
                actor,
            },
            body,
        });
    }

    delete(campsite_id: string, actor: string) {
        return this.client.post<MemberBanView>({
            route: "gg.campground.membership.deleteMemberBan",
            queries: {
                campsite_id,
                actor,
            },
        });
    }
}