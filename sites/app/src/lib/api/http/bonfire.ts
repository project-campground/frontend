import type { BonfireViewDetailed } from '#lib/types/campground/bonfires.js';
import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';
import type { PermissionViewEmbedded } from '#lib/types/campground/permissions.js';
import HTTPBackendObjectManager from './base-backend.js';

export default class HTTPBonfireManager extends HTTPBackendObjectManager {
	public get(campsite_id: string, bonfire_id: string) {
		return this.client.get<BonfireViewDetailed>({
			route: 'gg.campground.bonfire.getBonfire',
			queries: { campsite_id, bonfire_id },
		});
	}
	public async getMany(campsite_id: string): Promise<BonfireViewInList[]> {
		return this.client
			.get<
				Array<
					BonfireViewInList & { permissions: Array<PermissionViewEmbedded & { permissions: string }> }
				>
			>({ route: 'gg.campground.bonfire.getBonfires', queries: { campsite_id } })
			.then((resp) =>
				resp.map((bonfire) => ({
					...bonfire,
					permissions: bonfire.permissions.map((perm) => ({
						...perm,
						permissions: BigInt(perm.permissions),
					})),
				})),
			);
	}

	public create(campsite_id: string, body: { name: string; description: string; position: number }) {
		return this.client.post<BonfireViewDetailed>({
			route: 'gg.campground.bonfire.createBonfire',
			queries: { campsite_id },
			body,
		});
	}

	public update(
		campsite_id: string,
		bonfire_id: string,
		body: { name?: string; description?: string; avatarUri?: string; bannerUri?: string },
	) {
		return this.client.post<BonfireViewInList>({
			route: 'gg.campground.bonfire.updateBonfire',
			queries: { campsite_id, bonfire_id },
			body,
		});
	}

	public move(bonfire_id: string, body: { position?: number }) {
		return this.client.post<BonfireViewInList>({
			route: 'gg.campground.bonfire.moveBonfire',
			queries: { bonfire_id },
			body,
		});
	}

	public delete(campsite_id: string, bonfire_id: string) {
		return this.client.post<BonfireViewInList>({
			route: 'gg.campground.bonfire.deleteBonfire',
			queries: { campsite_id, bonfire_id },
		});
	}
}
