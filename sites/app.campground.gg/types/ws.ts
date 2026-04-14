import type { CampsiteViewBasic } from "./campground/campsites";
import type { BonfireViewBasic } from "./campground/bonfires";
import type { CampsitePermissionViewDetailed } from "./campground/permissions";
import type { MessageViewBasic } from "./campground/content";
import type { MemberBanView, MemberRolesModified } from "./campground/membership";
import type { CampsiteInviteViewBasic } from "./campground/invites";
import type { PermissionsDictionary, PermissionsStateDictionary } from "./campground/permissions";
import type { TentCategoryView, TentViewBasic } from "./campground/tent";

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