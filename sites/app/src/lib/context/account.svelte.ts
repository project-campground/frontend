import { createContext } from 'svelte';
import type { GetSession } from '$lib/types/atproto/session.js';
import type { CampsiteViewBasic, CampsiteViewWithDomain } from '$lib/types/campground/campsites.js';
import type { CampgroundProfileRecord } from '$lib/types/campground/user.js';
import type { Session } from '$lib/api/session/Session.svelte.js';
import XrpcError from '$lib/api/XrpcError.js';
import type { PreferenceNavCampsite } from '$lib/types/bluesky/preferences.js';
import { toLookup } from '$lib/util/array.js';

export enum AccountInfoLoadState {
	None = 0,
	Started = 1,
	Campsites = 2,
	All = 3,
	AllUnsigned = 4,
}

export interface AccountNavbarItem<T extends string> {
	type: T;
	id: string;
}
export interface AccountNavbarCampsite extends AccountNavbarItem<'campsite'> {
	campsite: CampsiteViewWithDomain;
}
export type AccountNavbarItemAny = AccountNavbarCampsite;

export class AccountInfo {
	public loadState: AccountInfoLoadState = $state(AccountInfoLoadState.None);
	public profile: CampgroundProfileRecord | null = $state(null);
	public navbarItems: AccountNavbarItemAny[] = $state([]);
	public sessionInfo: GetSession | null = $state(null);
	public userSettingsOpen = $state(false);

	constructor(private session: Session) {}

	public openUserSettings() {
		return (this.userSettingsOpen = true);
	}

	private async onPreferencesInit() {
		if (!this.session.preferences.full?.nav?.items)
			return (this.loadState = AccountInfoLoadState.Campsites);

		const backendDomains: Record<string, PreferenceNavCampsite[]> = toLookup(
			this.session.preferences.full.nav.items.filter(
				(x) => x.$type === 'gg.campground.actor.defs#navCampsitePref',
			) ?? [],
			(item) => item.domain,
		);

		const backendRespPromises = await Promise.allSettled(
			Object.entries(backendDomains).map(([domain, items]) =>
				this.session.atproto.getBackendJoinedCampsites(
					domain,
					items.map((x) => x.id),
				),
			),
		);

		const backendResps = backendRespPromises
			.filter((x) => x.status === 'fulfilled')
			.map(
				(x) => (x as PromiseFulfilledResult<{ campsites: CampsiteViewBasic[]; domain: string }>).value,
			);

		// Basically warning when certain back-end could not be fetched
		for (const badResp of backendRespPromises.filter((x) => x.status === 'rejected')) {
			console.warn('Rejected promise while fetching campsite list', badResp.reason);
		}

		const campsites = backendResps.flatMap((resp) =>
			resp.campsites.map(
				(campsite) => ({ ...campsite, _domain: resp.domain }) as CampsiteViewWithDomain,
			),
		);

		this.navbarItems = this.session.preferences.full.nav.items
			.map((x) => {
				if (x.$type !== 'gg.campground.actor.defs#navCampsitePref') return;

				const campsite = campsites.find((y) => y._domain === x.domain && y.id === x.id);

				return { type: 'campsite', id: `${x.id}@${x.domain}`, campsite } as AccountNavbarCampsite;
			})
			.filter((x) => x) as unknown as AccountNavbarItemAny[];

		return (this.loadState = AccountInfoLoadState.Campsites);
	}

	private async initUnsigned() {
		this.loadState = AccountInfoLoadState.AllUnsigned;
		return this;
	}

	public async init() {
		if (!this.session.auth.authenticated) return this.initUnsigned();
		else if (this.loadState !== AccountInfoLoadState.None) return this;

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

		return this;
	}
}

export const [getAccount, setAccount] = createContext<AccountInfo>();
