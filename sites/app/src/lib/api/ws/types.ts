import type { CampsiteViewBasic } from '../../types/campground/campsites.ts';
import type { BonfireViewBasic } from '../../types/campground/bonfires.ts';
import type { CampsitePermissionViewDetailed } from '../../types/campground/permissions.ts';
import type { MessageViewBasic } from '../../types/campground/content.ts';
import type { MemberBanView, MemberRolesModified } from '../../types/campground/membership.ts';
import type { CampsiteInviteViewBasic } from '../../types/campground/invites.ts';
import type {
	PermissionsDictionary,
	PermissionsStateDictionary,
} from '../../types/campground/permissions.ts';
import type { TentCategoryView, TentViewBasic } from '../../types/campground/tent.ts';

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

	BonfireCreated: BonfireViewBasic;
	BonfireUpdated: BonfireViewBasic;
	BonfireMoved: BonfireViewBasic;
	BonfireDeleted: BonfireViewBasic;

	CategoryCreated: TentCategoryView;
	CategoryUpdated: TentCategoryView;
	CategoryMoved: TentCategoryView;
	CategoryDeleted: TentCategoryView;

	TentCreated: TentViewBasic;
	TentUpdated: TentViewBasic;
	TentMoved: TentViewBasic;
	TentDeleted: TentViewBasic;

	PermissionUpdated: CampsitePermissionViewDetailed;
	PermissionView: PermissionViewPayload;

	MessageCreated: MessageViewBasic;
	MessageUpdated: MessageViewBasic;
};
