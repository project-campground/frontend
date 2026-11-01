import type { GetRolesOutput } from '#lib/types/campground/roles.js';
import type { RoleView } from '#lib/types/campground/roles.js';
import HTTPBackendObjectManager from './base-backend.js';

export interface RoleViewOutput extends Omit<RoleView, 'permissions'> {
	permissions: string;
}

export default class HTTPRoleManager extends HTTPBackendObjectManager {
	static createRequestBody(body: Record<string, any>) {
		return `{${Object.entries(body)
			.map(
				([key, value]) =>
					`${JSON.stringify(key)}:${key === 'permissions' ? value.toString() : JSON.stringify(value)}`,
			)
			.join(',')}}`;
	}

	public static createResponseView({ permissions, ...view }: RoleViewOutput): RoleView {
		return { ...view, permissions: BigInt(permissions) };
	}

	async getMany(campsite_id: string): Promise<GetRolesOutput> {
		return this.client
			.post<{
				roles: RoleViewOutput[];
			}>({ route: 'gg.campground.role.getRoles', queries: { campsite_id } })
			.then((resp) => ({ roles: resp.roles.map(HTTPRoleManager.createResponseView) }));
	}

	async create(
		campsite_id: string,
		body: Pick<RoleView, 'name' | 'permissions' | 'pingable' | 'raised' | 'colors' | 'motion'>,
	) {
		return this.client
			.post<RoleViewOutput>({
				route: 'gg.campground.role.createRole',
				queries: { campsite_id },
				body: HTTPRoleManager.createRequestBody(body),
			})
			.then(HTTPRoleManager.createResponseView);
	}

	async update(
		campsite_id: string,
		role_id: string,
		body: Partial<
			Pick<RoleView, 'name' | 'permissions' | 'pingable' | 'raised' | 'colors' | 'motion'>
		>,
	) {
		return this.client
			.post<RoleViewOutput>({
				route: 'gg.campground.role.updateRole',
				queries: { campsite_id, role_id },
				body: HTTPRoleManager.createRequestBody(body),
			})
			.then(HTTPRoleManager.createResponseView);
	}

	async move(campsite_id: string, role_id: string, position: number) {
		return this.client
			.post<{
				roles: RoleViewOutput[];
			}>({ route: 'gg.campground.role.moveRole', queries: { campsite_id, role_id }, body: { position } })
			.then((resp) => ({ permissions: resp.roles.map(HTTPRoleManager.createResponseView) }));
	}

	async delete(campsite_id: string, role_id: string) {
		return this.client
			.post<RoleViewOutput>({
				route: 'gg.campground.role.deleteRole',
				queries: { campsite_id, role_id },
			})
			.then(HTTPRoleManager.createResponseView);
	}
}
