import type { GradientAnimation } from "components/GradientTypography";
import type { PermissionsDictionary, PermissionsStateDictionary } from "./permissions";
import type { TentCategoryView, TentViewBasic } from "./tent";
import type { ProfileView, ProfileViewBasic, ProfileViewDetailed } from "./user";

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
}
export interface CampsiteViewBasic extends CampsiteView {
}
export interface CampsiteViewDetailed extends CampsiteView {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bonfires: BonfireViewBasic[];
    roles: CampsiteRoleView[];
    me: CampsiteMemberViewBasic;
}
export type CampsiteRoleMotion = GradientAnimation;
export interface CampsiteRoleView {
    id: string;
    campsiteId: string;
    name: string;
    displaySeparately: boolean;
    mentionable: boolean;
    permissions: PermissionsDictionary;
    position: number;
    colors: number[];
    motion: CampsiteRoleMotion;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    flags: number;
}
export interface CampsitePermissionView {
    bonfireId?: string;
    categoryId?: string;
    tentId?: string;

    userId?: string;
    roleId?: string;

    permissions: PermissionsStateDictionary;
}
export interface CampsitePermissionViewBasic extends CampsitePermissionView {
}
export interface CampsitePermissionViewDetailed extends CampsitePermissionView {
    id: string;
    campsiteId: string;

    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}
export interface CampsiteMemberView<TUser extends ProfileView> {
    user: TUser;
    nickname: string | null | undefined;
    roles: string[];
}
export interface CampsiteMemberViewBasic extends CampsiteMemberView<ProfileViewBasic> {
}
export interface CampsiteMemberViewAuthor extends CampsiteMemberView<ProfileViewBasic> {
    isMember: boolean;
}
export interface CampsiteMemberViewDetailed extends CampsiteMemberView<ProfileViewDetailed> {
    campsiteId: string;
    usedInviteId: string;
    joinedAt: string;
}
export interface BonfireView {
    id: string;
    campsiteId: string;
    name: string;
    description: string;
    avatarUri: string | null | undefined;
    bannerUri: string | null | undefined;
    position: number;
    home: boolean;
}
export interface BonfireViewBasic extends BonfireView {
}
export interface BonfireViewDetailed extends BonfireView {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
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
export interface GetMembersDetailedOutput {
    members: CampsiteMemberViewDetailed[];
}
export interface GetRolesOutput {
    roles: CampsiteRoleView[];
}
export interface GetPermissionsOutput {
    permissions: CampsitePermissionViewDetailed[];
}