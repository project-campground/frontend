import type { BlueskyPreference, CampgroundPreference } from '$lib/types/bluesky/preferences.js';
import HTTPAtprotoObjectManager from './base-atproto.js';

export default class HTTPPreferenceManager extends HTTPAtprotoObjectManager {
	public get() {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.get<{ preferences: Array<CampgroundPreference | BlueskyPreference> } | null>({
			route: `app.bsky.actor.getPreferences`,
		});
	}

	private put(preferences: Array<CampgroundPreference | BlueskyPreference>) {
		return this.client.post<null>({
			route: `app.bsky.actor.putPreferences`,
			body: { preferences: preferences },
		});
	}

	public async update(newPreferences: Array<CampgroundPreference | BlueskyPreference>) {
		const previousPreferences = await this.get();

		const newPreferencesTypes = newPreferences.map((x) => x.$type);
		const filtered =
			previousPreferences?.preferences.filter((x) => !newPreferencesTypes.includes(x.$type)) ?? [];

		return this.put(filtered.concat(newPreferences));
	}

	public async delete(
		preferenceTypes: Array<CampgroundPreference | BlueskyPreference>[number]['$type'],
	) {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		const previousPreferences = await this.get();

		const filtered =
			previousPreferences?.preferences.filter((x) => !preferenceTypes.includes(x.$type)) ?? [];

		return this.put(filtered);
	}
}
