import type { MemberViewAuthor } from './membership.ts';
import type { RoleView } from './roles.ts';

export interface PermissionView {
	permissions: bigint;
}
export interface PermissionViewBasic extends PermissionView {
	userId?: string;
	roleId?: string;
}
export interface PermissionViewEmbedded extends PermissionView {
	userId?: string;
	roleId?: string;
}
export interface PermissionViewDetailed extends PermissionView {
	bonfireId?: string;
	categoryId?: string;
	tentId?: string;

	member?: MemberViewAuthor;
	role?: RoleView;

	createdAt: string;
	createdBy: string;
	updatedAt: string;
	updatedBy: string;
}
export interface HasPermissionsEmbedded {
	permissions: PermissionViewEmbedded[];
}
