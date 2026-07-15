import type { CampsiteInviteViewDetailed } from '$lib/types/campground/invites';
import HTTPAtprotoObjectManager from './base-atproto';

export default class HTTPInviteGlobalManager extends HTTPAtprotoObjectManager {
	get(domain: string, invite_id: string) {
		return this.client.fetchProxied<CampsiteInviteViewDetailed>(domain, {
			method: 'GET',
			route: 'gg.campground.invite.getInvite',
			queries: { invite_id },
		});
	}

	use(domain: string, invite_id: string) {
		return this.client.fetchProxied<null>(domain, {
			method: 'POST',
			route: 'gg.campground.invite.useInvite',
			queries: { invite_id },
		});
	}
}
