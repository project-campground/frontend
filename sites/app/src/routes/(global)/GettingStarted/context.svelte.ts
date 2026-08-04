import type { CampgroundProfileRecord } from '$lib/types/campground/user.js';

export class GettingStarted {
	public profile: Partial<CampgroundProfileRecord> = $state({});
}
