import type { RoleView } from '$lib/types/campground/roles.js';

export interface DisplayProps {
	role: Pick<RoleView, 'colors' | 'name'>;
	onRemove?: () => unknown;
}
