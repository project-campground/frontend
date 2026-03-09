export interface PermissionsDictionary {
    general: number;
    content: number;
}
export interface PermissionsStateDictionary {
    allowed: PermissionsDictionary;
    denied: PermissionsDictionary;
}