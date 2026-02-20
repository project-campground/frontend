import type { BonfireViewBasic, CampsiteViewBasic } from "./campsites";
import type { TentMessageViewBasic } from "./content";
import type { CampsiteBanView, CampsiteInviteViewBasic, MemberRolesModified } from "./membership";
import type { TentCategoryView, TentViewBasic } from "./tent";

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

    MessageCreated: TentMessageViewBasic;
};