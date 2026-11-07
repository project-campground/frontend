import type { HasPermissionsEmbedded } from './permissions.ts';

export interface BonfireView {
	id: string;
	name: string;
	description: string;
	avatarUri: string | null | undefined;
	bannerUri: string | null | undefined;
	position: number;
	home: boolean;
}
export interface BonfireViewInList extends BonfireView, HasPermissionsEmbedded {}
export interface BonfireViewDetailed extends BonfireView {
	campsiteId: string;

	createdBy: string;
	createdAt: string;
	updatedBy: string;
	updatedAt: string;
}
