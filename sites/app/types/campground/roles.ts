import type { GradientAnimation } from "components/GradientTypography";
import type { PermissionsDictionary } from "./permissions";

export interface RoleView {
    id: string;
    campsiteId: string;
    name: string;
    raised: boolean;
    pingable: boolean;
    permissions: PermissionsDictionary;
    position: number;
    colors: number[];
    motion: RoleMotion;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    flags: number;
}
export type RoleMotion = GradientAnimation;
export interface GetRolesOutput {
    roles: RoleView[];
}
