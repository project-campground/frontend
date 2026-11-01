import type { CampsiteViewBasic, CampsiteViewDetailed } from '#lib/types/campground/campsites.js';
import type { RoleView } from '#lib/types/campground/roles.js';
import HTTPBackendObjectManager from './base-backend.js';

type CampsiteViewDetailedOutput = Omit<CampsiteViewDetailed, 'roles'> & {
	roles: Array<RoleView & { permissions: number }>;
};

export default class HTTPCampsiteManager extends HTTPBackendObjectManager {
	private static getResponseBody({
		roles,
		...view
	}: CampsiteViewDetailedOutput): CampsiteViewDetailed {
		return {
			roles: roles.map(({ permissions, ...role }) => ({ permissions: BigInt(permissions), ...role })),
			...view,
		};
	}

	public get(campsite_id: string) {
		return this.client
			.get<CampsiteViewDetailedOutput>({
				route: 'gg.campground.campsite.getCampsite',
				queries: { campsite_id },
			})
			.then(HTTPCampsiteManager.getResponseBody);
	}

	public update(
		campsite_id: string,
		body: {
			avatarUri?: string;
			bannerUri?: string;
			name?: string;
			description?: string;
			tags?: string[];
			vanityUrl?: string | null;
		},
	) {
		return this.client.post<CampsiteViewBasic>({
			route: 'gg.campground.campsite.updateCampsite',
			queries: { campsite_id },
			body,
		});
	}

	public delete(campsite_id: string) {
		return this.client.post<null>({
			route: 'gg.campground.campsite.deleteCampsite',
			queries: { campsite_id },
		});
	}
}
