import type { CampsiteMemberViewBasic, CampsitePermissionView, CampsiteRoleView } from "types/campsites";

export const sortPermissionsByLevel = (a: CampsitePermissionView, b: CampsitePermissionView) =>
    getPermissionLevel(a) - getPermissionLevel(b);
export const getPermissionLevel = (a: CampsitePermissionView) =>
    a.bonfireId ? 1 : a.categoryId ? 2 : 3;
const permissionKeys: (keyof CampsitePermissionView)[] = ["allowedCampsitePermissions", "allowedTentPermissions", "deniedCampsitePermissions", "deniedTentPermissions"]; 
const roleKeys: (keyof CampsiteRoleView)[] = ["campsitePermissions", "tentPermissions"]; 
export const aggregateAnyPermissions = <TType, TKey extends keyof TType>(keys: TKey[], values: TType[], defaultValues: Record<TKey, number>,) =>
    values.reduce((val, perm) => {
        for (const key of keys)
            val[key] |= perm[key] as number;
        return val;
    }, defaultValues);
export const aggregateCampsitePermissions = (permissions: CampsitePermissionView[]) =>
    aggregateAnyPermissions<CampsitePermissionView, typeof permissionKeys[number]>(
        permissionKeys,
        permissions,
        {
            allowedTentPermissions: 0,
            allowedCampsitePermissions: 0,
            deniedTentPermissions: 0,
            deniedCampsitePermissions: 0,
        } as Record<typeof permissionKeys[number], number>,
    );
export const aggregateRolePermissions = (roles: CampsiteRoleView[]) =>
    aggregateAnyPermissions<CampsiteRoleView, typeof roleKeys[number]>(
        roleKeys,
        roles,
        {
            campsitePermissions: 0,
            tentPermissions: 0,
        } as Record<typeof roleKeys[number], number>,
    );
export const aggregateAllPermissions = (member: CampsiteMemberViewBasic, roles: CampsiteRoleView[], permissions: CampsitePermissionView[]) => {
    const { campsitePermissions: campsiteRolePermissions, tentPermissions: tentRolePermissions } = aggregateRolePermissions(
        roles
            .filter((x) => member.roles.includes(x.id))
    );

    const filteredPerms = permissions.filter((x) => x.userId || x.roleId && member.roles.includes(x.roleId));
    const bonfirePerms = aggregateCampsitePermissions(filteredPerms.filter((x) => x.bonfireId));
    const categoryPerms = aggregateCampsitePermissions(filteredPerms.filter((x) => x.categoryId));
    const tentPerms = aggregateCampsitePermissions(filteredPerms.filter((x) => x.tentId));
    return {
        campsitePermissions:
            (campsiteRolePermissions & invertCampsite(bonfirePerms.deniedCampsitePermissions)) |
            (bonfirePerms.allowedCampsitePermissions & invertCampsite(categoryPerms.deniedCampsitePermissions)) |
            (categoryPerms.allowedCampsitePermissions & invertCampsite(tentPerms.deniedCampsitePermissions)) |
            tentPerms.allowedCampsitePermissions,
        tentPermissions:
            (tentRolePermissions & invertTent(bonfirePerms.deniedTentPermissions)) |
            (bonfirePerms.allowedTentPermissions & invertTent(categoryPerms.deniedTentPermissions)) |
            (categoryPerms.allowedTentPermissions & invertTent(tentPerms.deniedTentPermissions)) |
            tentPerms.allowedTentPermissions,
    };
}
const invertCampsite = (a: number) => CampsitePermissionConsts.MAX - a;
const invertTent = (a: number) => TentPermissionConsts.MAX - a;
export type AggregateCampsitePermissions = {
    allowedTentPermissions: number,
    allowedCampsitePermissions: number,
    deniedTentPermissions: number,
    deniedCampsitePermissions: number,
};
export type AggregatePermissions = {
    tentPermissions: number,
    campsitePermissions: number,
};
export const TentPermissionConsts = {
    VIEW_CONTENT: 0b1,
    CREATE_CONTENT: 0b10,
    PIN_CONTENT: 0b100,
    MANAGE_CONTENT: 0b1000,
    MENTION_EVERYONE: 0b10000,
    CREATE_PRIVATE_CONTENT: 0b100000,
    MAX: 0b111111,
} as const;
export const CampsitePermissionConsts = {
    MANAGE_CAMPSITE: 0b1,
    MANAGE_BONFIRES: 0b10,
    MANAGE_TENTS: 0b100,
    MANAGE_ROLES: 0b1000,
    GIVE_ROLES: 0b10000,
    MUTE_MEMBERS: 0b100000,
    KICK_MEMBERS: 0b1000000,
    BAN_MEMBERS: 0b10000000,
    MANAGE_SELF_IDENTITY: 0b100000000,
    MANAGE_OTHERS_IDENTITY: 0b1000000000,
    CREATE_INVITES: 0b10000000000,
    MANAGE_INVITES: 0b100000000000,
    MAX: 0b1111111111,
} as const;