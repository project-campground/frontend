import type { CampsiteMemberViewDetailed, GetMembersDetailedOutput, GetMembersOutput } from "types/campsites";
import HTTPClientObjectManager from "./base";

export default class HTTPClientMemberManager extends HTTPClientObjectManager {
    getMany(campsite_id: string, offsetOrIds: string[] | number) {
        return this.client.get<GetMembersOutput>({
            route: "gg.campground.membership.getMembers",
            queries: {
                campsite_id,
                offset: typeof offsetOrIds === "number"
                ? offsetOrIds.toString()
                : null,
                actors: Array.isArray(offsetOrIds)
                ? offsetOrIds
                : null
            },
        });
    }

    getManyDetailed(campsite_id: string, offset: number) {
        return this.client.get<GetMembersDetailedOutput>({
            route: "gg.campground.membership.getMembersDetailed",
            queries: {
                campsite_id,
                offset,
            },
        });
    }

    get(campsite_id: string, actor: string) {
        return this.client.get<CampsiteMemberViewDetailed>({
            route: "gg.campground.membership.getMember",
            queries: {
                campsite_id,
                actor,
            },
        });
    }
    
    update(campsite_id: string, actor: string, body: { nickname: string | undefined; }) {
        return this.client.post<CampsiteMemberViewDetailed>({
            route: "gg.campground.membership.updateMember",
            queries: { campsite_id, actor },
            body,
        });
    }

    remove(campsite_id: string, actor: string) {
        return this.client.post<null>({
            route: "gg.campground.membership.removeMember",
            queries: {
                campsite_id,
                actor,
            },
        });
    }

    addRole(campsite_id: string, role_id: string, body: { memberIds: string[]; }) {
        return this.client.post<number>({
            route: "gg.campground.membership.addMemberRoles",
            queries: { campsite_id, role_id },
            body,
        });
    }
    
    removeRole(campsite_id: string, role_id: string, body: { memberIds: string[]; }) {
        return this.client.post<number>({
            route: "gg.campground.membership.removeMemberRoles",
            queries: { campsite_id, role_id },
            body,
        });
    }
}