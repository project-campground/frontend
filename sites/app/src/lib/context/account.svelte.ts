import { createContext } from 'svelte';
import type { GetSession } from '$lib/types/atproto/session';
import type { CampsiteViewBasic, CampsiteViewWithDomain } from '$lib/types/campground/campsites';
import type { CampgroundProfileRecord } from '$lib/types/campground/user';
import type { Session } from '$lib/api/session/Session.svelte';
import type { HttpResponseOkWithContent } from '$lib/api/http/HTTPResponse';

export enum AccountInfoLoadState {
	None = 0,
	Started = 1,
	Campsites = 2,
	All = 3,
}

export class AccountInfo {
	public loadState: AccountInfoLoadState = $state(AccountInfoLoadState.None);
	public profile: CampgroundProfileRecord | null = $state(null);
	public campsites: CampsiteViewWithDomain[] = $state([]);
	public sessionInfo: GetSession | null = $state(null);
	public userSettingsOpen = $state(false);

	constructor(private session: Session) {}

	public openUserSettings() {
		return (this.userSettingsOpen = true);
	}

	private async onPreferencesInit() {
		const backendDomains = new Set(
			this.session.preferences.full.campsites?.campsites.map((x) => x.split('@')[0]) ?? [],
		);

		return Promise.allSettled(
			[...backendDomains].map((domain) => this.session.atproto.getBackendJoinedCampsites(domain)),
		).then((backendRespPromises) => {
			const backendResps = backendRespPromises
				.filter((x) => x.status === 'fulfilled' && x.value.ok)
				.map(
					(x) =>
						(
							x as PromiseFulfilledResult<
								HttpResponseOkWithContent<{ campsites: CampsiteViewBasic[]; domain: string }>
							>
						).value,
				);

			// Basically warning when certain back-end could not be fetched
			for (const badResp of backendRespPromises.filter(
				(x) => x.status === 'rejected' || !x.value.ok,
			)) {
				console.warn(
					badResp.status === 'rejected' ?
						'Rejected promise while fetching campsite list'
					:	'HTTP Error while fetching campsite list',
					badResp.status === 'rejected' ? badResp.reason : badResp.value,
				);
			}

			this.campsites = backendResps.flatMap((resp) =>
				resp.content!.campsites.map(
					(campsite) => ({ ...campsite, _domain: resp.content.domain }) as CampsiteViewWithDomain,
				),
			);

			return (this.loadState = AccountInfoLoadState.Campsites);
		});
	}

	public async init() {
		if (!this.session.auth.authenticated || this.loadState !== AccountInfoLoadState.None) return;

		this.loadState = AccountInfoLoadState.Started;

		this.session.preferences.onInit(async () => this.onPreferencesInit());

		const [sessionInfo, profile] = await Promise.allSettled([
			this.session.atproto.getSession(),
			this.session.atproto.profileRecords.get(this.session.auth.user.did),
			this.session.preferences.loaded && this.onPreferencesInit(),
		]);

		if (sessionInfo.status === 'rejected') throw sessionInfo.reason;
		else if (!sessionInfo.value.ok)
			throw new Error(
				`HTTP Error status while fetching session info: [${sessionInfo.value.status}] ${sessionInfo.value.errorHeader}: ${sessionInfo.value.errorDescription}`,
			);

		if (profile.status === 'rejected')
			console.warn(
				`Promise rejected (ERROR) while fetching profile info of the current account: ${profile.reason}`,
			);
		else if (!profile.value.ok)
			console.warn(
				`HTTP Error status while fetching profile info of the current account: [${profile.value.status}] ${profile.value.errorHeader}: ${profile.value.errorDescription}`,
			);

		this.sessionInfo = sessionInfo.value.content;
		this.profile =
			profile.status === 'fulfilled' && profile.value.ok ? profile.value.content.value : {};

		this.loadState = AccountInfoLoadState.All;
	}
}

export const [getAccount, setAccount] = createContext<AccountInfo>();
