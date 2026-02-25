export interface PermissionsDictionary {
    campsite: number;
    tent: number;
}
export interface PermissionsStateDictionary {
    allowed: PermissionsDictionary;
    denied: PermissionsDictionary;
}