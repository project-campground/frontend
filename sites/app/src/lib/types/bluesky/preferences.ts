export interface AtprotoPreference<T> {
	$type: T;
}
export interface BlueskyPreference extends AtprotoPreference<
	| 'app.bsky.actor.defs#adultContentPref'
	| 'app.bsky.actor.defs#contentLabelPref'
	| 'app.bsky.actor.defs#savedFeedsPref'
	| 'app.bsky.actor.defs#savedFeedsPrefV2'
	| 'app.bsky.actor.defs#personalDetailsPref'
	| 'app.bsky.actor.defs#declaredAgePref'
	| 'app.bsky.actor.defs#feedViewPref'
	| 'app.bsky.actor.defs#threadViewPref'
	| 'app.bsky.actor.defs#interestsPref'
	| 'app.bsky.actor.defs#mutedWordsPref'
	| 'app.bsky.actor.defs#hiddenPostsPref'
	| 'app.bsky.actor.defs#bskyAppStatePref'
	| 'app.bsky.actor.defs#labelersPref'
	| 'app.bsky.actor.defs#postInteractionSettingsPref'
	| 'app.bsky.actor.defs#verificationPrefs'
	| 'app.bsky.actor.defs#liveEventPreferences'
> {}

export type CampgroundPreferencePrefix = 'gg.campground.actor.defs';
export type CampgroundBlueskyPreferencePrefix = 'app.bsky.actor.defs#gg.campground.actor.defs';

export interface CampgroundPreferenceLocale extends AtprotoPreference<`${CampgroundBlueskyPreferencePrefix}.localePref`> {
	language: 'en-US';
}
export interface PreferenceNavbarItem<T extends string> {
	$type: T;
	id: string;
}
export interface PreferenceNavCampsite extends PreferenceNavbarItem<`${CampgroundPreferencePrefix}#navCampsitePref`> {
	domain: string;
}
export type PreferenceNavbarItemAny = PreferenceNavCampsite;
export interface CampgroundPreferenceNav extends AtprotoPreference<`${CampgroundBlueskyPreferencePrefix}.navPref`> {
	items: Array<PreferenceNavbarItemAny>;
}
export interface CampgroundPreferenceAppearance extends AtprotoPreference<`${CampgroundBlueskyPreferencePrefix}.appearancePref`> {
	theme: 'dark' | 'light' | 'system';
}
export interface CampgroundPreferenceInstances extends AtprotoPreference<`${CampgroundBlueskyPreferencePrefix}.instancesPref`> {
	domains: string[];
}

export type CampgroundPreference = CampgroundPreferenceAppearance | CampgroundPreferenceNav;
