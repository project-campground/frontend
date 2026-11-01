import type {
	CampsitePermissionViewBasic,
	CampsitePermissionViewDetailed,
	GetPermissionsOutput,
} from '#lib/types/campground/permissions.js';
import type { CampsitePermissionView } from '#lib/types/campground/permissions.js';
import HTTPBackendObjectManager from './base-backend.js';
import HTTPRoleManager from './role.ts';

type OutputView<T extends CampsitePermissionView> = Omit<T, 'permissions'> & {
	permissions: string;
};

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
	public static createResponseView<T extends CampsitePermissionView>({
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
	): Promise<GetPermissionsOutput> {
		return this.client
			.get<{
				permissions: OutputView<CampsitePermissionViewDetailed>[];
			}>({ route: 'gg.campground.permission.getPermissions', queries: HTTPPermissionManager.createQueries(queries) })
			.then((resp) => ({
				permissions: resp.permissions.map(HTTPPermissionManager.createResponseView),
			}));
	}

	async update(queries: PermissionQueries, body: Pick<CampsitePermissionView, 'permissions'>) {
		return this.client
			.post<
				OutputView<CampsitePermissionViewBasic>
			>({ route: 'gg.campground.permission.updatePermission', queries: HTTPPermissionManager.createQueries(queries), body: HTTPRoleManager.createRequestBody(body) })
			.then(HTTPPermissionManager.createResponseView);
	}
}
