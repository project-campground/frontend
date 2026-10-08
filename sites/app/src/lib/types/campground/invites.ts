import type { CampsiteViewBasic } from './campsites.js';
import type { ProfileViewBasic } from './user.js';

export interface CampsiteInviteView {
	id: string;
	allowedAmount?: number | null | undefined;
	expiresAt?: string | null | undefined;
	createdAt: string;
	createdBy: ProfileViewBasic;
	used: number;
}
export interface CampsiteInviteViewBasic extends CampsiteInviteView {
	campsiteId: string;
}
export interface CampsiteInviteViewDetailed extends CampsiteInviteView {
	campsite: CampsiteViewBasic;
}
export interface GetInvitesOutput {
	invites: CampsiteInviteViewBasic[];
}
