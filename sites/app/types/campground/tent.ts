import type { CampsitePermissionViewBasic } from './permissions';

export interface TentView {
	id: string;
	campsiteId: string;
	bonfireId: string;
	categoryId: string | null | undefined;
	name: string;
	description: string;
	type: TentType;
	viewType: number;

	position: number;
}
export type TentType = 'text';
export interface TentViewBasic extends TentView {}
export interface TentViewDetailed extends TentView {
	createdBy: string;
	createdAt: string;
	updatedBy: string;
	updatedAt: string;
}
export interface TentCategoryView {
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
	tents: TentViewBasic[];
	categories: TentCategoryView[];
	permissions: CampsitePermissionViewBasic[];
}
