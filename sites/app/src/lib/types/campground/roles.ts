import type { GradientMotion } from '@campground/ui';
import type { HasPosition } from './interfaces.js';

export interface RoleView extends HasPosition {
	id: string;
	campsiteId: string;
	name: string;
	raised: boolean;
	pingable: boolean;
	permissions: bigint;
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
