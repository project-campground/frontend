import type { CampsitePermissionView } from "./campsites";

export interface TentView {
    id: string;
    campsiteId: string;
    bonfireId: string;
    categoryId: string | null | undefined;
    name: string;
    description: string;
    type: TentType;
    viewType: number;
    
    priority: number;

    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}
export type TentType = "text";
export interface TentViewBasic extends TentView {
}
export interface TentViewDetailed extends TentView {
    permissions: CampsitePermissionView[];
}
export interface TentCategoryView {
    id: string;
    campsiteId: string;
    bonfireId: string;
    name: string;
    description: string;
    
    priority: number;

    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}

export interface GetTentsOutput {
    tents: TentViewBasic[];
    categories: TentCategoryView[];
}