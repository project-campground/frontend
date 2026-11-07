import type { CampsiteViewBasic } from '../../types/campground/campsites.ts';
import type { BonfireViewInList } from '../../types/campground/bonfires.ts';
import type { PermissionViewDetailed } from '../../types/campground/permissions.ts';
import type { MessageViewBasic } from '../../types/campground/content.ts';
import type { MemberBanView, MemberRolesModified } from '../../types/campground/membership.ts';
import type { CampsiteInviteViewBasic } from '../../types/campground/invites.ts';
import type {
	PermissionsDictionary,
	PermissionsStateDictionary,
} from '../../types/campground/permissions.ts';
import type { TentCategoryViewDetailed, TentViewBasic } from '../../types/campground/tent.ts';
import type { RoleView } from '#lib/types/campground/roles.js';

export interface PermissionViewPayload {
	roles: PermissionsDictionary;
	bonfires: Record<string, PermissionsStateDictionary>;
	categories: Record<string, PermissionsStateDictionary>;
	tents: Record<string, PermissionsStateDictionary>;
}

export type WSMessageTypeToPayload = {
	CampsiteLeft: { id: string };
	CampsiteCreated: CampsiteViewBasic;
	CampsiteUpdated: CampsiteViewBasic;
	CampsiteJoined: CampsiteViewBasic;

	MemberRolesAdded: MemberRolesModified;
	MemberRolesRemoved: MemberRolesModified;

	MemberBanCreated: MemberBanView;
	MemberBanDeleted: MemberBanView;

	InviteCreated: CampsiteInviteViewBasic;
	InviteDeleted: CampsiteInviteViewBasic;

	RoleCreated: RoleView;
	RoleUpdated: RoleView;
	RoleDeleted: RoleView;
	RoleMoved: RoleView;

	BonfireCreated: BonfireViewInList;
	BonfireUpdated: BonfireViewInList;
	BonfireMoved: BonfireViewInList;
	BonfireDeleted: BonfireViewInList;

	CategoryCreated: TentCategoryViewDetailed;
	CategoryUpdated: TentCategoryViewDetailed;
	CategoryMoved: TentCategoryViewDetailed;
	CategoryDeleted: TentCategoryViewDetailed;

	TentCreated: TentViewBasic;
	TentUpdated: TentViewBasic;
	TentMoved: TentViewBasic;
	TentDeleted: TentViewBasic;

	PermissionUpdated: PermissionViewDetailed;
	PermissionView: PermissionViewPayload;

	MessageCreated: MessageViewBasic;
	MessageUpdated: MessageViewBasic;
	MessageDeleted: MessageViewBasic;
};
