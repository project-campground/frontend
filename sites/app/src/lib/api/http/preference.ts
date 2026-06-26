import type { BlueskyPreference, CampgroundPreference } from 'types/bluesky/preferences';
import HTTPAtprotoObjectManager from './base-atproto';

export default class HTTPPreferenceManager extends HTTPAtprotoObjectManager {
	public get() {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.get<{ preferences: Array<CampgroundPreference | BlueskyPreference> }>({
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

		if (!previousPreferences.ok)
			throw new Error(
				`Error while fetching previous preferences: ${previousPreferences.status} ${previousPreferences.errorHeader}: ${previousPreferences.errorDescription}`,
			);

		const newPreferencesTypes = newPreferences.map((x) => x.$type);
		const filtered = previousPreferences.content.preferences.filter(
			(x) => !newPreferencesTypes.includes(x.$type),
		);

		return this.put(filtered.concat(newPreferences));
	}

	public async delete(
		preferenceTypes: Array<CampgroundPreference | BlueskyPreference>[number]['$type'],
	) {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		const previousPreferences = await this.get();

		if (!previousPreferences.ok)
			throw new Error(
				`Error while fetching previous preferences: ${previousPreferences.status} ${previousPreferences.errorHeader}: ${previousPreferences.errorDescription}`,
			);

		const filtered = previousPreferences.content.preferences.filter(
			(x) => !preferenceTypes.includes(x.$type),
		);

		return this.put(filtered);
	}
}
