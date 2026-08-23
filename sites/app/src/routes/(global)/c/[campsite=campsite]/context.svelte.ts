import type HTTPBackendClient from '$lib/api/http/HTTPBackendClient.ts';
import type { Session } from '$lib/api/session/Session.svelte.js';
import type { AccountInfo } from '$lib/context/account.svelte.js';
import type { CampsiteViewDetailed } from '$lib/types/campground/campsites.js';
import { createContext } from 'svelte';

export class CampsiteContext {
	public campsite: CampsiteViewDetailed | null = $state(null);

	constructor(
		private appview: HTTPBackendClient,
		private session: Session,
		private account: AccountInfo,
	) {}

	public async init(campsiteId: string) {
		this.campsite = await this.appview.campsites.get(campsiteId);
	}
}

export const [getCampsiteContext, setCampsiteContext] = createContext<CampsiteContext>();
