import type { GetRolesOutput } from '$lib/types/campground/roles.js';
import type { RoleView } from '$lib/types/campground/roles.js';
import HTTPBackendObjectManager from './base-backend.js';

export default class HTTPRoleManager extends HTTPBackendObjectManager {
	getMany(campsite_id: string) {
		return this.client.post<GetRolesOutput>({
			route: 'gg.campground.role.getRoles',
			queries: { campsite_id },
		});
	}

	create(
		campsite_id: string,
		body: Pick<RoleView, 'name' | 'permissions' | 'pingable' | 'raised' | 'colors' | 'motion'>,
	) {
		return this.client.post<RoleView>({
			route: 'gg.campground.role.createRole',
			queries: { campsite_id },
			body,
		});
	}

	update(
		campsite_id: string,
		role_id: string,
		body: Partial<
			Pick<RoleView, 'name' | 'permissions' | 'pingable' | 'raised' | 'colors' | 'motion'>
		>,
	) {
		return this.client.post<RoleView>({
			route: 'gg.campground.role.updateRole',
			queries: { campsite_id, role_id },
			body,
		});
	}

	moveMany(campsite_id: string, body: { rolesByPosition: Record<string, number> }) {
		return this.client.post<GetRolesOutput>({
			route: 'gg.campground.role.moveRoles',
			queries: { campsite_id },
			body,
		});
	}

	delete(campsite_id: string, role_id: string) {
		return this.client.post<RoleView>({
			route: 'gg.campground.role.deleteRole',
			queries: { campsite_id, role_id },
		});
	}
}
