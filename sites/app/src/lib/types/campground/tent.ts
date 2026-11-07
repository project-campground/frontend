import type { HasPermissionsEmbedded, PermissionViewEmbedded } from './permissions.ts';

export interface TentView {
	id: string;
	categoryId: string | null | undefined;

	name: string;
	description: string;
	type: TentType;
	viewType: number;

	position: number;
}
export type TentType = 'text';
export interface TentViewBasic extends TentView {
	campsiteId: string;
	bonfireId: string;
}
export interface TentViewInList extends TentView, HasPermissionsEmbedded {}
export interface TentViewDetailed extends TentViewBasic {
	createdBy: string;
	createdAt: string;
	updatedBy: string;
	updatedAt: string;
}
export interface TentCategoryView {
	id: string;
	name: string;
	description: string;

	position: number;
}
export interface TentCategoryViewInList extends TentCategoryView, HasPermissionsEmbedded {}
export interface TentCategoryViewDetailed extends TentCategoryView {
	id: string;
	campsiteId: string;
	bonfireId: string;
	name: string;
	description: string;

	position: number;

	createdBy: string;
	createdAt: string;
	updatedBy: string;
	updatedAt: string;
}

export interface GetTentsOutput {
	tents: TentViewInList[];
	categories: TentCategoryViewInList[];
}
