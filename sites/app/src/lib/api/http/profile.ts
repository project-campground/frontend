import type { ProfileViewDetailed } from '$lib/types/campground/user.js';
import HTTPBackendObjectManager from './base-backend.js';

export default class HTTPProfileManager extends HTTPBackendObjectManager {
	public get(actor: string) {
		return this.client.get<ProfileViewDetailed>({
			route: `gg.campground.actor.getProfile`,
			queries: { actor },
		});
	}
}
