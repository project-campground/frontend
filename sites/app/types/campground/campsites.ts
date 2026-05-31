import type { TentViewBasic } from "./tent";
import type { RoleView } from "./roles";
import type { MemberViewBasic } from "./membership";
import type { BonfireViewBasic } from "./bonfires";

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
export interface CampsiteViewWithDomain extends CampsiteViewBasic {
    _domain: string;
}
export interface CampsiteViewDetailed extends CampsiteView {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    bonfires: BonfireViewBasic[];
    roles: RoleView[];
    me: MemberViewBasic;
}
export interface CreateCampsiteOutput {
    campsite: CampsiteViewDetailed;
    defaultTent: TentViewBasic;
    ownerMember: MemberViewBasic;
}
