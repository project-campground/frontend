import type { BonfireViewBasic, CampsitePermissionViewDetailed, CampsiteViewBasic } from "./campsites";
import type { TentMessageViewBasic } from "./content";
import type { CampsiteBanView, CampsiteInviteViewBasic, MemberRolesModified } from "./membership";
import type { PermissionsDictionary, PermissionsStateDictionary } from "./permissions";
import type { TentCategoryView, TentViewBasic } from "./tent";

export interface PermissionViewPayload {
    roles: PermissionsDictionary;
    bonfires: Record<string, PermissionsStateDictionary>;
    categories: Record<string, PermissionsStateDictionary>;
    tents: Record<string, PermissionsStateDictionary>;
}

export type TypeToPayload = {
    CampsiteLeft: { id: string; };
    CampsiteCreated: CampsiteViewBasic;
    CampsiteUpdated: CampsiteViewBasic;
    CampsiteJoined: CampsiteViewBasic;

    MemberRolesAdded: MemberRolesModified;
    MemberRolesRemoved: MemberRolesModified;

    MemberBanCreated: CampsiteBanView;
    MemberBanDeleted: CampsiteBanView;

    InviteCreated: CampsiteInviteViewBasic;
    InviteDeleted: CampsiteInviteViewBasic;

    BonfireCreated: BonfireViewBasic;
    BonfireUpdated: BonfireViewBasic;
    BonfireDeleted: BonfireViewBasic;
    
    CategoryCreated: TentCategoryView;
    CategoryUpdated: TentCategoryView;
    CategoryMoved: TentCategoryView;
    CategoryDeleted: TentCategoryView;

    TentCreated: TentViewBasic;
    TentUpdated: TentViewBasic;
    TentMoved: TentViewBasic;
    TentDeleted: TentViewBasic;

    PermissionUpdated: CampsitePermissionViewDetailed;
    PermissionView: PermissionViewPayload;

    MessageCreated: TentMessageViewBasic;
};