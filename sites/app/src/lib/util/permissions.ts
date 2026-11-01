import type { CampsitePermissionView } from '../types/campground/permissions.js';
import type { MemberViewBasic } from '../types/campground/membership.js';
import type { RoleView } from '../types/campground/roles.js';
import { mapLookup, toLookup } from './array.js';

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

export const getPermissionState = (value: bigint): [allowed: bigint, denied: bigint] => {
	let allowed = 0n;
	let denied = 0n;

	let digitCount = value.toString().length;

	for (let i = 0n; i < Math.floor(digitCount / 2); i++) {
		// Value at position
		const flag = (value >> (i * 2n)) & 0b11n;

		if (flag === 0b10n) denied += 1n << i;
		else if (flag === 0b11n) allowed += 1n << i;
	}

	return [allowed, denied];
};

export const applyNestedPermissions = (ancestor: bigint, current: bigint): bigint => {
	const [allowed, denied] = getPermissionState(current);

	return (ancestor & ~denied) | allowed;
};

export const aggregatePermissions = (values: bigint[]) =>
	values.reduce((previous, current) => previous | current, 0n);

export const aggregateRolePermissions = (roles: RoleView[]) =>
	aggregatePermissions(roles.map((x) => x.permissions));

export const aggregateCampsitePermissions = (permissions: CampsitePermissionView[]) =>
	aggregatePermissions(permissions.map((x) => x.permissions));

export type AggregatedPermissions = {
	role: bigint;
	bonfire: bigint;
	categories: Record<string, bigint>;
	tents: Record<string, bigint>;
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
