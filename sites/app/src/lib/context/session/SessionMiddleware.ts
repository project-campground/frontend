import HTTPAtprotoClient from '~/api/http/HTTPAtprotoClient';
import type { SessionAuth, SessionAuthed, SessionAuthRefresh } from './types';
import { defaultAppBackendUrl } from 'api.config';
import type { CampgroundPreferences } from '~/api/preferences/PreferenceManager';

type JsonParsed<T> = { parsed: false; content: null } | { parsed: true; content: T };

function tryParseJson<T>(raw: string): JsonParsed<T> {
	try {
		return { parsed: true, content: JSON.parse(raw) };
	} catch (err) {
		if (err instanceof SyntaxError) return { parsed: false, content: null };
		else throw err;
	}
}
function getFromStorageOrDefault<T>(storage: Storage, key: string, _default: T) {
	const inStorage = storage.getItem(key);
	return inStorage ? (tryParseJson<T>(inStorage)?.content ?? _default) : _default;
}

export default class SessionMiddleware {
	auth: SessionAuth;
	preferences: CampgroundPreferences;
	http: HTTPAtprotoClient;

	constructor(storage: Storage) {
		this.auth = getFromStorageOrDefault<SessionAuth>(storage, 'auth', { authenticated: false });
		this.preferences = getFromStorageOrDefault(storage, 'settings', {
			locale: { language: 'en-US' },
		});

		// In-case it wasn't done in-client
		const onRefresh = (refresh: SessionAuthRefresh) => {
			(this.auth as SessionAuthed).user = { ...(this.auth as SessionAuthed).user, ...refresh };
			// Save
			storage.setItem('auth', JSON.stringify(this.auth));
		};

		this.http =
			this.auth.authenticated ?
				new HTTPAtprotoClient(
					{
						auth: this.auth.user.accessJwt,
						refreshAuth: this.auth.user.refreshJwt,
						userDid: this.auth.user.did,
					},
					onRefresh,
				)
			:	new HTTPAtprotoClient({ url: defaultAppBackendUrl });
	}
}
