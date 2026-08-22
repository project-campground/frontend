import type { Session } from '$lib/api/session/Session.svelte.js';
import type {
	CampgroundPreference,
	CampgroundPreferenceAppearance,
	CampgroundPreferenceInstances,
	CampgroundPreferenceLocale,
	CampgroundPreferenceNav,
	PreferenceNavbarItemAny,
} from '$lib/types/bluesky/preferences.js';
import type HTTPAtprotoClient from '../http/HTTPAtprotoClient.js';

export interface CampgroundPreferences {
	locale?: Omit<CampgroundPreferenceLocale, '$type'>;
	appearance?: Omit<CampgroundPreferenceAppearance, '$type'>;
	nav?: Omit<CampgroundPreferenceNav, '$type'>;
	instances?: Omit<CampgroundPreferenceInstances, '$type'>;
}

const preferenceStorageKey = 'preference';

export default class PreferenceManager {
	private session: Session;

	public global: Partial<CampgroundPreferences> = {};
	public local: Partial<CampgroundPreferences> = {};

	public hasInit: boolean = false;
	public loaded: boolean = false;

	private static CAMPGROUND_PREFERENCE_PREFIX = 'app.bsky.actor.defs#' + 'gg.campground.actor.defs.';
	private _onInit?: Array<() => Promise<unknown> | unknown> = [];

	constructor(session: Session) {
		this.session = session;
	}

	private get _http(): HTTPAtprotoClient {
		return this.session.atproto;
	}
	private get _isAuthenticated(): boolean {
		return this.session.auth.authenticated;
	}

	public get full() {
		return Object.assign({}, this.global, this.local);
	}

	public get locale() {
		return this.local.locale?.language ?? this.global.locale?.language ?? 'en-US';
	}

	public getValue<T extends keyof CampgroundPreferences>(key: T) {
		return this.local[key] ?? this.global[key];
	}

	public onInit(onInit: () => Promise<unknown> | unknown) {
		this._onInit?.push(onInit);
	}

	public async init() {
		if (!this._isAuthenticated) return;

		if (this.hasInit) return;

		this.hasInit = true;

		const settingsInLocalStorage = localStorage.getItem(preferenceStorageKey);
		this.local = settingsInLocalStorage ? JSON.parse(settingsInLocalStorage) : {};

		return this._http.preference.get().then((resp) => {
			const preference =
				resp?.preferences.filter((x) =>
					x.$type.startsWith(PreferenceManager.CAMPGROUND_PREFERENCE_PREFIX),
				) ?? ([] as CampgroundPreference[]);

			// Basically `app.bsky.whatever#examplePref`, but we also add `gg.campground.actor.defs` before `example`
			const preferenceEntries = preference.map(({ $type, ...pref }) => [
				$type.split('#')[1].split('.').slice(-1)[0].slice(0, -'Pref'.length),
				pref,
			]);

			this.global = Object.fromEntries(preferenceEntries);

			this.loaded = true;

			return this.finalizeInit();
		});
	}

	private updateNavbarList(items: PreferenceNavbarItemAny[]) {
		return this.updateGlobal({ nav: { ...this.global.nav, items } });
	}

	public addCampsiteToListGlobally(domain: string, id: string) {
		const entry: PreferenceNavbarItemAny = {
			$type: 'gg.campground.actor.defs#navCampsitePref',
			domain,
			id,
		};

		return this.addNavbarItem(entry);
	}

	public addNavbarItem(entry: PreferenceNavbarItemAny) {
		const newCampsiteList = this.global.nav?.items.concat(entry) ?? [entry];
		return this.updateNavbarList(newCampsiteList);
	}

	public removeCampsiteFromListGlobally(domain: string, campsiteId: string) {
		const newCampsiteList =
			this.global.nav?.items.filter(
				(x) =>
					x.$type !== 'gg.campground.actor.defs#navCampsitePref'
					|| x.id !== campsiteId
					|| x.domain !== domain,
			) ?? [];
		return this.updateNavbarList(newCampsiteList);
	}

	private async finalizeInit(): Promise<unknown> {
		return Promise.allSettled(this._onInit?.map((x) => x()) as unknown[]).then((resps) => {
			for (const badResp of resps.filter((x) => x.status === 'rejected'))
				console.error(badResp.reason);

			delete this._onInit;
		});
	}

	public updateLocal(newPreference: Partial<CampgroundPreferences>) {
		localStorage.setItem('settings', JSON.stringify(Object.assign(this.local, newPreference)));
	}

	public async updateGlobal(newPreference: Partial<CampgroundPreferences>) {
		const preferenceList = Object.entries(newPreference).map(([key, value]) => ({
			$type: `${PreferenceManager.CAMPGROUND_PREFERENCE_PREFIX}${key}Pref`,
			...value,
		})) as CampgroundPreference[];
		Object.assign(this.global, newPreference);

		return this._http.preference.update(preferenceList);
	}
}
