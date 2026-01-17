import type { TentCategoryView, TentViewBasic } from "./tent";
import type { ProfileView, ProfileViewBasic } from "./user";

export interface CampsiteView {
    id: string;
    name: string;
    vanity_url: string | null | undefined;
    description: string;
    avatarUri: string | null | undefined;
    bannerUri: string | null | undefined;
    tags: string[];
    memberCount: number;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}
export interface CampsiteViewBasic extends CampsiteView {
}
export interface CampsiteViewDetailed extends CampsiteView {
    bonfires: BonfireViewBasic[];
}
export interface CampsiteMemberView<TUser extends ProfileView> {
    user: TUser;
    userId: string;
    campsiteId: string;
    joinedAt: string;
    nickname: string | null | undefined;
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