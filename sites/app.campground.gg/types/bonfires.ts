import type { TentCategoryView, TentViewBasic } from "./tent";

export interface BonfireView {
    id: string;
    campsiteId: string;
    name: string;
    description: string;
    avatarUri: string | null | undefined;
    bannerUri: string | null | undefined;
    position: number;
    home: boolean;
}
export interface BonfireViewBasic extends BonfireView {}
export interface BonfireViewDetailed extends BonfireView {
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
    categories: TentCategoryView[];
    tents: TentViewBasic[];
}
