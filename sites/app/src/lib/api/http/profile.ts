import type { ProfileViewDetailed } from '$lib/types/campground/user';
import HTTPBackendObjectManager from './base-backend';

export default class HTTPProfileManager extends HTTPBackendObjectManager {
	public get(actor: string) {
		return this.client.get<ProfileViewDetailed>({
			route: `gg.campground.actor.getProfile`,
			queries: { actor },
		});
	}
}
