export interface PermissionsDictionary {
    general: number;
    content: number;
}
export interface PermissionsStateDictionary {
    allowed: PermissionsDictionary;
    denied: PermissionsDictionary;
}
export interface CampsitePermissionView {
    bonfireId?: string;
    categoryId?: string;
    tentId?: string;

    userId?: string;
    roleId?: string;

    permissions: PermissionsStateDictionary;
}
export interface CampsitePermissionViewBasic extends CampsitePermissionView {}
export interface CampsitePermissionViewDetailed extends CampsitePermissionView {
    id: string;
    campsiteId: string;

    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}
export interface GetPermissionsOutput {
    permissions: CampsitePermissionViewDetailed[];
}
