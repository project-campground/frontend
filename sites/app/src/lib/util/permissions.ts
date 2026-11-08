import type { HasPermissionsEmbedded } from '#lib/types/campground/permissions.js';
import type { MemberViewBasic } from '../types/campground/membership.js';
import type { RoleView } from '../types/campground/roles.js';

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

	let digitCount = value.toString(2).length;
	console.log({ digitCount });

	for (let i = 0n; i < Math.floor(digitCount / 2); i++) {
		// Value at position
		const flag = (value >> (i * 2n)) & 0b11n;
		console.log({ i, flag, value, valueShifted: value >> (i * 2n) });

		if (flag === 0b10n) denied |= 1n << i;
		else if (flag === 0b11n) allowed |= 1n << i;
	}

	return [allowed, denied];
};

export const getPermissions = <T extends HasPermissionsEmbedded>(
	ancestor: bigint,
	item: T,
): bigint => {
	return applyNestedPermissions(ancestor, aggregatePermissions(item.permissions));
};

export const applyNestedPermissions = (ancestor: bigint, current: bigint): bigint => {
	const [allowed, denied] = getPermissionState(current);
	console.log({ allowed, denied, ancestor, current });

	return (ancestor & ~denied) | allowed;
};

export function aggregatePermissions<T extends { permissions: bigint }>(items: T[]) {
	return items.reduce((previous, current) => previous | current.permissions, 0n);
}

/**
 * More readable way of checking if all permission flags exist in permissions. Would be more performant if compile-time/inline functions existed.
 * @param permissions The permissions to check
 * @param flags The permission flags to check
 * @returns Whether all permission flags exist in permissions
 */
export const hasPermission = (permissions: bigint, flags: bigint): boolean =>
	(permissions & flags) === flags;
/**
 * More readable way of checking if ANY permission flag at all exists in permissions. Would be more performant if compile-time/inline functions existed.
 * @param permissions The permissions to check
 * @param flags The permission flags to check
 * @returns Whether any of permission flags exist within permissions
 */
export const hasAnyPermission = (permissions: bigint, flags: bigint): boolean =>
	(permissions & flags) !== 0n;
