import type { TentCategoryView, TentViewBasic } from "./tent";
import type { ProfileView, ProfileViewBasic } from "./user";

export interface CampsiteView {
    id: string;
    name: string;
    vanityUrl: string | null | undefined;
    description: string;
    avatarUri: string | null | undefined;
    bannerUri: string | null | undefined;
    tags: string[];
    memberCount: number;
    owner: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}
export interface CampsiteViewBasic extends CampsiteView {
}
export interface CampsiteViewDetailed extends CampsiteView {
    bonfires: BonfireViewBasic[];
    roles: CampsiteRoleView[];
    member: CampsiteMemberViewBasic;
}
export interface CampsiteRoleView {
    id: string;
    campsiteId: string;
    name: string;
    displaySeparately: boolean;
    mentionable: boolean;
    campsitePermissions: number;
    tentPermissions: number;
    priority: number;
    color: number;
    colorSecondary: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    flags: number;
}
export interface CampsitePermissionView {
    id: string;
    campsiteId: string;

    bonfireId?: string;
    categoryId?: string;
    tentId?: string;

    userId?: string;
    roleId?: string;

    allowedCampsitePermissions: number;
    allowedTentPermissions: number;
    deniedCampsitePermissions: number;
    deniedTentPermissions: number;

    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}
export interface CampsiteMemberView<TUser extends ProfileView> {
    user: TUser;
    userId: string;
    campsiteId: string;
    joinedAt: string;
    nickname: string | null | undefined;
    roles: string[];
}
export interface CampsiteMemberViewBasic extends CampsiteMemberView<ProfileViewBasic> {
}
export interface BonfireView {
    id: string;
    campsiteId: string;
    name: string;
    description: string;
    avatarUri: string | null | undefined;
    bannerUri: string | null | undefined;
    priority: number;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}
export interface BonfireViewBasic extends BonfireView {
}
export interface BonfireViewDetailed extends BonfireView {
    categories: TentCategoryView[];
    tents: TentViewBasic[];
}

export interface CreateCampsiteOutput {
    campsite: CampsiteViewDetailed;
    defaultTent: TentViewBasic;
    ownerMember: CampsiteMemberViewBasic;
}
export interface GetMembersOutput {
    members: CampsiteMemberViewBasic[];
}
export interface GetRolesOutput {
    roles: CampsiteRoleView[];
}