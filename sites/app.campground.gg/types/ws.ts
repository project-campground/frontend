import type { CampsiteViewBasic } from "./campsites";
import type { BonfireViewBasic } from "./bonfires";
import type { CampsitePermissionViewDetailed } from "./permissions";
import type { MessageViewBasic } from "./content";
import type { MemberBanView, MemberRolesModified } from "./membership";
import type { CampsiteInviteViewBasic } from "./invites";
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

    MemberBanCreated: MemberBanView;
    MemberBanDeleted: MemberBanView;

    InviteCreated: CampsiteInviteViewBasic;
    InviteDeleted: CampsiteInviteViewBasic;

    BonfireCreated: BonfireViewBasic;
    BonfireUpdated: BonfireViewBasic;
    BonfireMoved: BonfireViewBasic;
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

    MessageCreated: MessageViewBasic;
};