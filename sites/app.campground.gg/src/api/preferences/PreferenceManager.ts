import type {
    CampgroundPreference,
    CampgroundPreferenceAppearance,
    CampgroundPreferenceLocale,
    CampgroundPreferenceCampsites,
} from "types/bluesky/preferences";
import type HTTPAtprotoClient from "../http/HTTPAtprotoClient";

export interface CampgroundPreferences {
    locale?: Omit<CampgroundPreferenceLocale, "$type">;
    appearance?: Omit<CampgroundPreferenceAppearance, "$type">;
    campsites?: Omit<CampgroundPreferenceCampsites, "$type">;
}

export default class PreferenceManager {
    private _http: HTTPAtprotoClient;
    public global: Partial<CampgroundPreferences> = {};
    public local: Partial<CampgroundPreferences> = {};
    public hasInit: boolean = false;
    public loaded: boolean = false;
    private _isAuthenticated: boolean;
    private static CAMPGROUND_PREFERENCE_PREFIX = "app.bsky.actor.defs#" + "campground:";
    private _onInit?: Array<() => Promise<unknown> | unknown> = [];

    constructor(http: HTTPAtprotoClient, isAuthenticated: boolean) {
        this._http = http;
        this._isAuthenticated = isAuthenticated;
    }

    public get full() {
        return Object.assign({}, this.global, this.local);
    }

    public get locale() {
        return this.local.locale?.language ?? this.global.locale?.language ?? "en-US";
    }

    public getValue<T extends keyof CampgroundPreferences>(key: T) {
        return this.local[key] ?? this.global[key];
    }

    public onInit(onInit: () => Promise<unknown> | unknown) {
        this._onInit?.push(onInit);
    }

    public async init() {
        if (this.hasInit)
            return;

        this.hasInit = true;

        const settingsInLocalStorage = localStorage.getItem("settings");
        this.local = settingsInLocalStorage ? JSON.parse(settingsInLocalStorage) : {};

        if (!this._isAuthenticated)
            return;

        return this._http.preference.get().then((resp) => {
            if (!resp.ok)
                throw new Error(
                    `Error while fetching preferences for the user: ${resp.status} ${resp.errorHeader} ${resp.errorDescription}`,
                );

            const preference = resp.content.preferences.filter((x) =>
                x.$type.startsWith(
                    PreferenceManager.CAMPGROUND_PREFERENCE_PREFIX,
                ),
            ) as CampgroundPreference[];
            const preferenceEntries = preference.map(({ $type, ...pref }) => [
                $type.split("#")[1].split(".").slice(-1)[0].slice(0, -"Pref".length),
                pref,
            ]);

            this.global = Object.fromEntries(preferenceEntries);
            
            this.loaded = true;
            return this.finalizeInit();
        });
    }

    private finalizeInit(): Promise<unknown> {
        return Promise.allSettled(
            this._onInit
                ?.map((x) => x()) as unknown[],
        )
            .then((resps) => {
                for (const badResp of resps.filter((x) => x.status === "rejected"))
                    console.error(badResp.reason);

                delete this._onInit;
            })
    }

    public updateLocal(newPreference: Partial<CampgroundPreferences>) {
        localStorage.setItem("settings", JSON.stringify(Object.assign(this.local, newPreference)));
    }

    public async updateGlobal(newPreference: Partial<CampgroundPreferences>) {
        const preferenceList = Object.entries(newPreference).map(
            ([key, value]) => ({
                $type: `${PreferenceManager.CAMPGROUND_PREFERENCE_PREFIX}.${key}Pref`,
                ...value,
            }),
        ) as CampgroundPreference[];
        Object.assign(this.global, newPreference);

        return this._http.preference.update(preferenceList).then((resp) => {
            if (!resp.ok)
                throw new Error(
                    `Error while updating preferences for the user: ${resp.status} ${resp.errorHeader} ${resp.errorDescription}`,
                );
        });
    }
}
