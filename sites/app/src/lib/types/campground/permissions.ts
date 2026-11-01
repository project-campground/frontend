import type { MemberViewAuthor } from './membership.ts';
import type { RoleView } from './roles.ts';

export interface CampsitePermissionView {
	bonfireId?: string;
	categoryId?: string;
	tentId?: string;

	permissions: bigint;
}
export interface CampsitePermissionViewBasic extends CampsitePermissionView {
	userId?: string;
	roleId?: string;
}
export interface CampsitePermissionViewDetailed extends CampsitePermissionView {
	member?: MemberViewAuthor;
	role?: RoleView;

	createdAt: string;
	createdBy: string;
	updatedAt: string;
	updatedBy: string;
}
export interface GetPermissionsOutput {
	permissions: CampsitePermissionViewDetailed[];
}
