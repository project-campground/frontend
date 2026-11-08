import type { RoleView } from './roles.js';
import type { ProfileViewEmpty, ProfileViewBasic, ProfileViewDetailed } from './user.js';

export interface MemberBanView {
	user: ProfileViewBasic;
	userId: string;
	campsiteId: string;
	reason?: string | null | undefined;
	createdAt: string;
	createdBy: string;
	updatedAt: string;
	updatedBy: string;
}

export interface MemberRolesModified {
	role: RoleView;
	members: string[];
}

export interface GetBansOutput {
	memberBans: MemberBanView[];
}
export interface GetMembersOutput {
	members: MemberViewBasic[];
}
export interface GetMembersDetailedOutput {
	members: MemberViewDetailed[];
}
export type MemberViewBasic = MemberView<ProfileViewBasic>;
export interface MemberView<TUser extends ProfileViewEmpty> {
	user: TUser;
	nickname: string | null | undefined;
	roles: string[];
}
export interface MemberViewAuthor extends MemberView<ProfileViewBasic> {
	isMember: boolean;
}
export interface MemberViewDetailed extends MemberView<ProfileViewDetailed> {
	campsiteId: string;
	usedInviteId: string;
	joinedAt: string;
}
