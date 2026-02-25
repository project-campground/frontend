import type { PermissionsDictionary, PermissionsStateDictionary } from "types/permissions";
import { ContextBase } from "../session/base";
import type { GetTentsOutput } from "types/tent";

export class CurrentTentListContext extends ContextBase<GetTentsOutput> {
}
export interface PermissionsContextValue {
    permissions: CurrentTentListContext;
    role: PermissionsDictionary;
    bonfire: PermissionsStateDictionary;
    categories: Record<string, PermissionsStateDictionary>;
    tents: Record<string, PermissionsStateDictionary>;
}