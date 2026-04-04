import type { GetPermissionsOutput } from "types/permissions";
import type { CampsitePermissionView } from "types/permissions";
import HTTPClientObjectManager from "./base";

export default class HTTPClientPermissionManager extends HTTPClientObjectManager {
    get(queries: ({ tent_id: string; } | { category_id: string; } | { bonfire_id: string; }) & { non_self?: boolean }) {
        return this.client.get<GetPermissionsOutput>({
            route: "gg.campground.permission.getPermissions",
            queries,
        });
    }

    update(queries: ({ tent_id: string; } | { category_id: string; } | { bonfire_id: string; }) & ({ role_id: string; } | { actor: string; }), body: Pick<CampsitePermissionView, "permissions">) {
        return this.client.post<CampsitePermissionView>({
            route: "gg.campground.permission.updatePermission",
            queries,
            body,
        });
    }
}