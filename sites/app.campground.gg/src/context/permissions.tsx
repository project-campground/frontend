import { createContext } from "react";
import type { CampsitePermissionView, CampsiteViewDetailed } from "types/campsites";
import { aggregateAllPermissions, CampsitePermissionConsts, TentPermissionConsts, type AggregatePermissions } from "~/util/permissions";

export interface PermissionsContextValue {
    role: AggregatePermissions;
    bonfire: AggregatePermissions;
    tent: AggregatePermissions;
}

export const PermissionsContext = createContext<PermissionsContextValue>({
    role: { tentPermissions: 0, campsitePermissions: 0 },
    bonfire: { tentPermissions: 0, campsitePermissions: 0 },
    tent: { tentPermissions: 0, campsitePermissions: 0 },
});
export const ownerPermissions: PermissionsContextValue = {
    role: {
        tentPermissions: TentPermissionConsts.MAX,
        campsitePermissions: CampsitePermissionConsts.MAX,
    },
    bonfire: {
        tentPermissions: TentPermissionConsts.MAX,
        campsitePermissions: CampsitePermissionConsts.MAX,
    },
    tent: {
        tentPermissions: TentPermissionConsts.MAX,
        campsitePermissions: CampsitePermissionConsts.MAX,
    }
};

export const getPermissionsContextValue = (campsite: CampsiteViewDetailed, permissions: CampsitePermissionView[]) =>
    campsite.member.user.did === campsite.owner ? ownerPermissions : aggregateAllPermissions(campsite.member, campsite.roles, permissions);