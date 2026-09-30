import type { CampsitePermissionView } from '../types/campground/permissions.js';
import type { MemberViewBasic } from '../types/campground/membership.js';
import type { RoleView } from '../types/campground/roles.js';
import type {
	PermissionsDictionary,
	PermissionsStateDictionary,
} from '../types/campground/permissions.js';
import { mapLookup, toLookup } from './array.js';
import { ContentPermission, GeneralPermission } from './constants.ts';

export const lowestPriority = 0x7fffffff as const;
export const highestPriority = -0x80000000 as const;

export const isAboveUser = (
	against: MemberViewBasic,
	asker: MemberViewBasic,
	owner: string,
	roles: RoleView[],
) =>
	asker.user.did !== against.user.did
	&& against.user.did !== owner
	&& (asker.user.did === owner
		|| getPriorityOfMember(asker, roles) > getPriorityOfMember(against, roles));
export const getPriorityOfMember = (member: MemberViewBasic, roles: RoleView[]) =>
	getHighestRole(member, roles)?.position ?? lowestPriority;
export const getHighestRole = (member: MemberViewBasic, roles: RoleView[]) =>
	roles.find((x) => member.roles.includes(x.id));

// To make it easier to edit later if it goes beyond ("allowed" and "denied") or ("campsite" and "tent")
const permissionStateKeys: (keyof PermissionsStateDictionary)[] = ['allowed', 'denied'];
const permissionDictionaryKeys: (keyof PermissionsDictionary)[] = ['general', 'content'];

export const applyNestedPermissions = (
	ancestor: PermissionsDictionary,
	current: PermissionsStateDictionary,
): PermissionsDictionary => ({
	general:
		(ancestor.general & invertGeneralPermission(current.denied.general)) | current.allowed.general,
	content:
		(ancestor.content & invertContentPermission(current.denied.content)) | current.allowed.content,
});
export const aggregateAnyPermissions = (values: PermissionsDictionary[]) =>
	values.reduce(
		(val, perm) => {
			for (const key of permissionDictionaryKeys) val[key] |= perm[key] as number;
			return val;
		},
		{ content: 0, general: 0 },
	);
export const aggregateRolePermissions = (roles: RoleView[]) =>
	aggregateAnyPermissions(roles.map((x) => x.permissions));
export const aggregateCampsitePermissions = (permissions: CampsitePermissionView[]) =>
	Object.fromEntries(
		permissionStateKeys.map((state) => [
			state,
			aggregateAnyPermissions(permissions.map((perm) => perm.permissions[state])),
		]),
	) as unknown as PermissionsStateDictionary;
export type AggregatedPermissions = {
	role: PermissionsDictionary;
	bonfire: PermissionsDictionary;
	categories: Record<string, PermissionsDictionary>;
	tents: Record<string, PermissionsStateDictionary>;
};
export const aggregateAllPermissions = (
	member: MemberViewBasic,
	roles: RoleView[],
	permissions: CampsitePermissionView[],
): AggregatedPermissions => {
	const rolePerms = aggregateRolePermissions(roles.filter((x) => member.roles.includes(x.id)));

	const filteredPerms = permissions.filter(
		(x) => x.userId || (x.roleId && member.roles.includes(x.roleId)),
	);
	const bonfirePermsAggregated = aggregateCampsitePermissions(
		filteredPerms.filter((x) => (x.categoryId ?? x.tentId ?? null) === null),
	);
	const bonfirePerms = applyNestedPermissions(rolePerms, bonfirePermsAggregated);

	const categoryPerms = mapLookup(
		toLookup(
			filteredPerms.filter((x) => x.categoryId),
			(perm) => perm.categoryId!,
		),
		(_, value) => applyNestedPermissions(bonfirePerms, aggregateCampsitePermissions(value)),
	);
	const tentPerms = mapLookup(
		toLookup(
			filteredPerms.filter((x) => x.tentId),
			(perm) => perm.tentId!,
		),
		(_, value) => aggregateCampsitePermissions(value),
	);

	return { role: rolePerms, bonfire: bonfirePerms, categories: categoryPerms, tents: tentPerms };
};
export const invertContentPermission = (permission: number) => ContentPermission.Max - permission;
export const invertGeneralPermission = (permission: number) => GeneralPermission.Max - permission;
export const nullPermissions: PermissionsDictionary = { general: 0, content: 0 };
