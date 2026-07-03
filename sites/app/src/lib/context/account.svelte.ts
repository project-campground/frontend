import { createContext } from 'svelte';
import type { GetSession } from '$lib/types/atproto/session';
import type { CampsiteViewWithDomain } from '$lib/types/campground/campsites';
import type { CampgroundProfileRecord } from '$lib/types/campground/user';

export class AccountInfo {
	public profile: CampgroundProfileRecord;
	public campsites: CampsiteViewWithDomain[];
	public sessionInfo: GetSession;
	public userSettingsOpen = $state(false);

	constructor(
		profile: CampgroundProfileRecord,
		campsites: CampsiteViewWithDomain[],
		sessionInfo: GetSession,
	) {
		this.profile = $state(profile);
		this.campsites = $state(campsites);
		this.sessionInfo = $state(sessionInfo);
	}

	public openUserSettings() {
		return (this.userSettingsOpen = true);
	}
}
export class AccountContext {
	public account: AccountInfo | null = $state(null);
}

export const [getAccount, setAccount] = createContext<AccountContext>();
