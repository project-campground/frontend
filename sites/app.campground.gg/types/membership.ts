import type { CampsiteRoleView, CampsiteViewBasic } from "./campsites";
import type { ProfileViewBasic } from "./user";

export interface CampsiteBanView {
    user: ProfileViewBasic;
    userId: string;
    campsiteId: string;
    reason?: string | null | undefined;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

export interface CampsiteInviteView {
    id: string;
    allowedAmount?: number | null | undefined;
    expiresAt?: string | null | undefined;
    createdAt: string;
    createdBy: ProfileViewBasic;
    used: number;
}

export interface CampsiteInviteViewBasic extends CampsiteInviteView {
    campsiteId: string;
}

export interface CampsiteInviteViewDetailed extends CampsiteInviteView {
    campsite: CampsiteViewBasic;
}

export interface MemberRolesModified {
    role: CampsiteRoleView;
    members: string[];
}

export interface GetInvitesOutput {
    invites: CampsiteInviteViewBasic[];
}

export interface GetBansOutput {
    memberBans: CampsiteBanView[];
}