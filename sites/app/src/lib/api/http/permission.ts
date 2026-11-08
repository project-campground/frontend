import type {
	PermissionViewBasic,
	PermissionViewDetailed,
} from '#lib/types/campground/permissions.js';
import type { PermissionView } from '#lib/types/campground/permissions.js';
import HTTPBackendObjectManager from './base-backend.js';
import HTTPRoleManager from './role.ts';

type OutputView<T extends PermissionView> = Omit<T, 'permissions'> & { permissions: string };

export interface PermissionLocationQueries {
	bonfireId?: string;
	categoryId?: string;
	tentId?: string;
}
export interface PermissionTargetQueries {
	actor?: string;
	roleId?: string;
}
export interface PermissionQueries extends PermissionLocationQueries, PermissionTargetQueries {}

export default class HTTPPermissionManager extends HTTPBackendObjectManager {
	public static createResponseView<T extends PermissionView>({
		permissions,
		...view
	}: OutputView<T>): T {
		return { permissions: BigInt(permissions), ...view } as unknown as T;
	}
	private static createQueries(queries: PermissionQueries) {
		return {
			bonfire_id: (queries.categoryId ?? queries.tentId) ? undefined : queries.bonfireId,
			category_id: queries.categoryId,
			tent_id: queries.tentId,
			actor: queries.actor,
			role_id: queries.roleId,
		};
	}

	async get(
		queries: PermissionLocationQueries & { non_self?: boolean },
	): Promise<PermissionViewDetailed[]> {
		return this.client
			.get<OutputView<PermissionViewDetailed>[]>({
				route: 'gg.campground.permission.getPermissions',
				queries: HTTPPermissionManager.createQueries(queries),
			})
			.then((permissions) => permissions.map(HTTPPermissionManager.createResponseView));
	}

	async update(queries: PermissionQueries, body: Pick<PermissionView, 'permissions'>) {
		return this.client
			.post<OutputView<PermissionViewBasic>>({
				route: 'gg.campground.permission.updatePermission',
				queries: HTTPPermissionManager.createQueries(queries),
				body: HTTPRoleManager.createRequestBody(body),
			})
			.then(HTTPPermissionManager.createResponseView);
	}
}
