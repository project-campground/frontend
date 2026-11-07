import type { CampsiteViewWithDomain } from '#lib/types/campground/campsites.js';

export const enum AccountInfoLoadState {
	None = 0,
	Started = 1,
	Campsites = 2,
	All = 3,
	AllUnsigned = 4,
}

export const enum NavigationItemType {
	Campsite = 0,
}
export interface NavigationItem<T extends NavigationItemType> {
	type: T;
	id: string;
}
export interface NavigationCampsite extends NavigationItem<NavigationItemType.Campsite> {
	campsite: CampsiteViewWithDomain;
}
export type NavigationItemAny = NavigationCampsite;
