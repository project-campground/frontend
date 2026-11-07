import type { TentViewBasic } from '#lib/types/campground/tent.js';
import { PermissionFlag } from '#lib/util/constants.js';

export type PseudoTentType = 'bulletin' | 'members';

export interface PseudoTentViewBasic extends Omit<
	TentViewBasic,
	'campsiteId' | 'bonfireId' | 'categoryId' | 'name' | 'type' | 'position'
> {
	requiresAnyPermission?: bigint;
	type: PseudoTentType;
}
export const pseudoTentList: PseudoTentViewBasic[] = [
	{ id: 'bulletin', type: 'bulletin', viewType: 0, description: '' },
	{
		id: 'members',
		type: 'members',
		viewType: 0,
		description: '',
		requiresAnyPermission:
			PermissionFlag.BanMembers
			| PermissionFlag.KickMembers
			| PermissionFlag.GiveRoles
			| PermissionFlag.MuteMembers,
	},
];
