import type { CampsiteRoleView, GetRolesOutput } from "types/campsites";
import HTTPClientObjectManager from "./base";

export default class HTTPClientRoleManager extends HTTPClientObjectManager {
    getMany(campsite_id: string) {
        return this.client.post<GetRolesOutput>({
            route: "gg.campground.campsite.getRoles",
            queries: { campsite_id },
        });
    }

    create(campsite_id: string, body: Pick<CampsiteRoleView, "name" | "permissions" | "mentionable" | "displaySeparately" | "colors" | "motion">) {
        return this.client.post<CampsiteRoleView>({
            route: "gg.campground.campsite.createRole",
            queries: { campsite_id },
            body,
        });
    }
    
    update(campsite_id: string, role_id: string, body: Partial<Pick<CampsiteRoleView, "name" | "permissions" | "mentionable" | "displaySeparately" | "colors" | "motion">>) {
        return this.client.post<CampsiteRoleView>({
            route: "gg.campground.campsite.updateRole",
            queries: { campsite_id, role_id },
            body,
        });
    }
    
    moveMany(campsite_id: string, body: { rolesByPosition: Record<string, number>; }) {
        return this.client.post<GetRolesOutput>({
            route: "gg.campground.campsite.moveRoles",
            queries: { campsite_id, },
            body,
        });
    }
    
    delete(campsite_id: string, role_id: string) {
        return this.client.post<CampsiteRoleView>({
            route: "gg.campground.campsite.deleteRole",
            queries: { campsite_id, role_id },
        });
    }
}