import type { RoleView } from '$lib/types/campground/roles.js';

export interface DisplayProps {
	role: Pick<RoleView, 'colors' | 'name'>;
	onRemove?: () => unknown;
}
export interface AdderProps {
	roles: Pick<RoleView, 'colors' | 'name' | 'id'>[];
	onAdd: (id: RoleView['id']) => unknown;
}
