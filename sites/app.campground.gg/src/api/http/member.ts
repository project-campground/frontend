import type { MemberViewDetailed } from "types/campground/membership";
import type { GetMembersDetailedOutput } from "types/campground/membership";
import type { GetMembersOutput } from "types/campground/membership";
import HTTPBackendObjectManager from "./base-backend";

export default class HTTPMemberManager extends HTTPBackendObjectManager {
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
        return this.client.get<MemberViewDetailed>({
            route: "gg.campground.membership.getMember",
            queries: {
                campsite_id,
                actor,
            },
        });
    }
    
    update(campsite_id: string, actor: string, body: { nickname: string | undefined; }) {
        return this.client.post<MemberViewDetailed>({
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
            route: "gg.campground.role.addMemberRoles",
            queries: { campsite_id, role_id },
            body,
        });
    }
    
    removeRole(campsite_id: string, role_id: string, body: { memberIds: string[]; }) {
        return this.client.post<number>({
            route: "gg.campground.role.removeMemberRoles",
            queries: { campsite_id, role_id },
            body,
        });
    }
}