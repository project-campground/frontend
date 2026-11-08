import type { HasPosition } from './interfaces.ts';
import type { HasPermissionsEmbedded } from './permissions.ts';

export interface BonfireView extends HasPosition {
	id: string;
	name: string;
	description: string;
	avatarUri: string | null | undefined;
	bannerUri: string | null | undefined;
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
