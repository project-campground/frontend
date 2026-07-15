import { createContext } from 'svelte';
import type { GetSession } from '$lib/types/atproto/session';
import type { CampsiteViewBasic, CampsiteViewWithDomain } from '$lib/types/campground/campsites';
import type { CampgroundProfileRecord } from '$lib/types/campground/user';
import type { Session } from '$lib/api/session/Session.svelte';
import XrpcError from '$lib/api/XrpcError';

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
				.filter((x) => x.status === 'fulfilled')
				.map(
					(x) => (x as PromiseFulfilledResult<{ campsites: CampsiteViewBasic[]; domain: string }>).value,
				);

			// Basically warning when certain back-end could not be fetched
			for (const badResp of backendRespPromises.filter((x) => x.status === 'rejected')) {
				console.warn('Rejected promise while fetching campsite list', badResp.reason);
			}

			this.campsites = backendResps.flatMap((resp) =>
				resp.campsites.map(
					(campsite) => ({ ...campsite, _domain: resp.domain }) as CampsiteViewWithDomain,
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

		if (
			profile.status === 'rejected'
			&& (!(profile.reason instanceof XrpcError) || profile.reason.code !== 'RecordNotFound')
		)
			console.warn(
				`Promise rejected (ERROR) while fetching profile info of the current account:`,
				profile.reason,
			);

		this.sessionInfo = sessionInfo.value;
		this.profile =
			profile.status === 'fulfilled' ? profile.value.value
				// Profile does not exist
			: profile.reason instanceof XrpcError && profile.reason.code === 'RecordNotFound' ? null
				// Error with the profile
			: {};

		this.loadState = AccountInfoLoadState.All;
	}
}

export const [getAccount, setAccount] = createContext<AccountInfo>();
