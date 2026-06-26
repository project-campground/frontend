import type { BonfireViewDetailed } from 'types/campground/bonfires';
import type { BonfireViewBasic } from 'types/campground/bonfires';
import HTTPBackendObjectManager from './base-backend';

export default class HTTPBonfireManager extends HTTPBackendObjectManager {
	public get(campsite_id: string, bonfire_id: string) {
		return this.client.get<BonfireViewDetailed>({
			route: 'gg.campground.bonfire.getBonfire',
			queries: { campsite_id, bonfire_id },
		});
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
		return this.client.post<BonfireViewBasic>({
			route: 'gg.campground.bonfire.updateBonfire',
			queries: { campsite_id, bonfire_id },
			body,
		});
	}

	public move(bonfire_id: string, body: { position?: number }) {
		return this.client.post<BonfireViewBasic>({
			route: 'gg.campground.bonfire.moveBonfire',
			queries: { bonfire_id },
			body,
		});
	}

	public delete(campsite_id: string, bonfire_id: string) {
		return this.client.post<BonfireViewBasic>({
			route: 'gg.campground.bonfire.deleteBonfire',
			queries: { campsite_id, bonfire_id },
		});
	}
}
