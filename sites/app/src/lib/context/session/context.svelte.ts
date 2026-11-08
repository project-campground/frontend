import { createContext } from 'svelte';
import type { GetSession } from '#lib/types/atproto/session.js';
import type { CampsiteViewBasic, CampsiteViewWithDomain } from '#lib/types/campground/campsites.js';
import type { CampgroundProfileRecord } from '#lib/types/campground/user.js';
import type { AuthContext } from '#lib/context/auth/context.svelte.js';
import XrpcError from '#lib/api/XrpcError.js';
import type {
	PreferenceNavbarItemAny,
	PreferenceNavCampsite,
} from '#lib/types/bluesky/preferences.js';
import { toLookup } from '#lib/util/array.js';
import {
	AccountInfoLoadState,
	NavigationItemType,
	type NavigationCampsite,
	type NavigationItemAny,
} from './types.ts';
import type { AtprotoRecord } from '#lib/types/atproto/record.js';

export class Session {
	public loadState: AccountInfoLoadState = $state(AccountInfoLoadState.None);
	public profile: CampgroundProfileRecord | null = $state(null);
	public navbarItems: NavigationItemAny[] = $state([]);
	public sessionInfo: GetSession | null = $state(null);

	constructor(private session: AuthContext) {}

	private async _onPreferencesInit() {
		if (!this.session.preferences.full?.nav?.items)
			return (this.loadState = AccountInfoLoadState.Campsites);

		const backendDomains: Record<string, PreferenceNavCampsite[]> = toLookup(
			this.session.preferences.full.nav.items.filter(
				(x) =>
					x.$type === 'gg.campground.actor.defs#navCampsitePref'
					&& typeof x.domain === 'string'
					&& typeof x.id === 'string',
			) ?? [],
			(item) => item.domain,
		);

		const instancesToCampsites = await Promise.allSettled(
			Object.entries(backendDomains).map(([domain, items]) =>
				this.session.atproto.getBackendJoinedCampsites(
					domain,
					items.map((x) => x.id),
				),
			),
		);

		const validInstanceFetches = instancesToCampsites
			.filter((x) => x.status === 'fulfilled')
			.map((x) => (x as PromiseFulfilledResult<CampsiteViewWithDomain[]>).value);

		// Basically warning when certain back-end could not be fetched
		for (const invalid of instancesToCampsites.filter((x) => x.status === 'rejected')) {
			console.warn('Rejected promise while fetching campsite list', invalid.reason);
		}

		const campsites = validInstanceFetches.flatMap((campsites) => campsites);

		this.navbarItems = this.session.preferences.full.nav.items
			.map((x) => this.getNavbarItem(campsites, x))
			.filter((x) => x) as unknown as NavigationItemAny[];

		return (this.loadState = AccountInfoLoadState.Campsites);
	}

	private getNavbarItem(
		campsites: CampsiteViewWithDomain[],
		navItem: PreferenceNavbarItemAny,
	): NavigationItemAny | void {
		if (navItem.$type !== 'gg.campground.actor.defs#navCampsitePref') return;

		const campsite = campsites.find((y) => y.domain === navItem.domain && y.id === navItem.id);

		if (!campsite) return;

		return {
			type: NavigationItemType.Campsite,
			id: `${navItem.id}@${campsite.domain}`,
			campsite,
		} as NavigationCampsite;
	}

	public async addCampsiteToNavbar(domain: string, campsite: CampsiteViewBasic) {
		this.navbarItems.push({
			type: NavigationItemType.Campsite,
			id: `${campsite.id}@${domain}`,
			campsite: { ...campsite, domain },
		});
		return this.session.preferences.addCampsiteToListGlobally(domain, campsite.id);
	}

	public async removeCampsiteFromNavbar(domain: string, campsiteId: string) {
		const index = this.navbarItems.findIndex(
			(x) => x.campsite.id === campsiteId && x.campsite.domain === domain,
		);

		if (index < 0) return;

		this.navbarItems.splice(index, 1);

		return this.session.preferences.removeCampsiteFromListGlobally(domain, campsiteId);
	}

	public async init() {
		if (!this.session.auth.authenticated) return this._initUnsigned();
		// Ensure it isn't spammed for whatever reason
		else if (this.loadState !== AccountInfoLoadState.None) return this;

		this.loadState = AccountInfoLoadState.Started;

		// Know preferences being initialized ASAP
		this.session.preferences.onInit(async () => this._onPreferencesInit());

		const [sessionInfo, profile] = await Promise.allSettled([
			this.session.atproto.getSession(),
			this.session.atproto.profileRecords.get(this.session.auth.user.did),
			// FIXME It could have already been initialized
			this.session.preferences.loaded && this._onPreferencesInit(),
		]);

		return this._postFetch(sessionInfo, profile);
	}

	private async _initUnsigned() {
		this.loadState = AccountInfoLoadState.AllUnsigned;
		return this;
	}

	private async _postFetch(
		sessionInfo: PromiseSettledResult<GetSession>,
		profile: PromiseSettledResult<AtprotoRecord<CampgroundProfileRecord>>,
	) {
		if (sessionInfo.status === 'rejected') throw sessionInfo.reason;
		else if (
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

export const [getSession, setSession] = createContext<Session>();
