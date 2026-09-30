import type { GradientMotion } from '@campground/ui';
import type { PermissionsDictionary } from './permissions.js';

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
export type RoleMotion = GradientMotion;
export interface GetRolesOutput {
	roles: RoleView[];
}
