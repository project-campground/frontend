import type { Session } from '$lib/api/session/Session.svelte';
import type {
	CampgroundPreference,
	CampgroundPreferenceAppearance,
	CampgroundPreferenceLocale,
	CampgroundPreferenceCampsites,
} from '$lib/types/bluesky/preferences';
import type HTTPAtprotoClient from '../http/HTTPAtprotoClient';

export interface CampgroundPreferences {
	locale?: Omit<CampgroundPreferenceLocale, '$type'>;
	appearance?: Omit<CampgroundPreferenceAppearance, '$type'>;
	campsites?: Omit<CampgroundPreferenceCampsites, '$type'>;
}

const preferenceStorageKey = 'preference';

export default class PreferenceManager {
	private session: Session;

	public global: Partial<CampgroundPreferences> = {};
	public local: Partial<CampgroundPreferences> = {};

	public hasInit: boolean = false;
	public loaded: boolean = false;

	private static CAMPGROUND_PREFERENCE_PREFIX = 'app.bsky.actor.defs#' + 'campground:';
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

			// Basically `app.bsky.whatever#examplePref`, but we also add `campground:` before `example`
			const preferenceEntries = preference.map(({ $type, ...pref }) => [
				$type.split('#')[1].split(':').slice(-1)[0].slice(0, -'Pref'.length),
				pref,
			]);

			this.global = Object.fromEntries(preferenceEntries);

			this.loaded = true;

			return this.finalizeInit();
		});
	}

	private updateCampsiteToListGlobally(campsites: string[]) {
		return this.updateGlobal({ campsites: { ...this.global.campsites, campsites } });
	}

	public addCampsiteToListGlobally(domain: string, campsiteId: string) {
		const entry = `${domain}@${campsiteId}`;

		const newCampsiteList = this.global.campsites?.campsites.concat(entry) ?? [entry];
		return this.updateCampsiteToListGlobally(newCampsiteList);
	}

	public removeCampsiteFromListGlobally(domain: string, campsiteId: string) {
		const newCampsiteList =
			this.global.campsites?.campsites.filter((x) => x !== `${domain}@${campsiteId}`) ?? [];
		return this.updateCampsiteToListGlobally(newCampsiteList);
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
