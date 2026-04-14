import type {
    CampgroundPreference,
    CampgroundPreferenceAppearance,
    CampgroundPreferenceLocale,
} from "types/bluesky/preferences";
import type HTTPClient from "../http/HTTPClient";

export interface CampgroundPreferences {
    locale?: Omit<CampgroundPreferenceLocale, "$type">;
    appearance?: Omit<CampgroundPreferenceAppearance, "$type">;
}

export default class PreferenceManager {
    private _http: HTTPClient;
    public global: Partial<CampgroundPreferences> = {};
    public local: Partial<CampgroundPreferences> = {};
    public hasInit: boolean = false;
    private _isAuthenticated: boolean;
    private static CAMPGROUND_PREFERENCE_PREFIX = "gg.campground.actor.defs";

    constructor(http: HTTPClient, isAuthenticated: boolean) {
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
                $type.split("#")[1].slice(0, -"Pref".length),
                pref,
            ]);

            this.global = Object.fromEntries(preferenceEntries);
        });
    }

    public updateLocal(newPreference: Partial<CampgroundPreferences>) {
        localStorage.setItem("settings", JSON.stringify(Object.assign(this.local, newPreference)));
    }

    public async updateGlobal(newPreference: Partial<CampgroundPreferences>) {
        const preferenceList = Object.entries(newPreference).map(
            ([key, value]) => ({
                $type: `${PreferenceManager.CAMPGROUND_PREFERENCE_PREFIX}#${key}Pref`,
                ...value,
            }),
        ) as CampgroundPreference[];

        return this._http.preference.update(preferenceList).then((resp) => {
            if (!resp.ok)
                throw new Error(
                    `Error while updating preferences for the user: ${resp.status} ${resp.errorHeader} ${resp.errorDescription}`,
                );
        });
    }
}
