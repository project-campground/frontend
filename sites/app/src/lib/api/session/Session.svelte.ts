import { createContext } from 'svelte';
import HTTPAtprotoClient from '$lib/api/http/HTTPAtprotoClient';
import PreferenceManager from '$lib/api/preferences/PreferenceManager';
import { defaultAppApiUrl } from '../../../../api.config';
import type {
	AuthCredentials,
	SavedAuth,
	SessionAuth,
	SessionAuthed,
	SessionAuthRefresh,
} from './types';

const sessionStorageKey = 'session';
const savedAuthStorageKey = 'frozen';

export class Session {
	private _refreshSession = (refresh: SessionAuthRefresh) =>
		this.setAuth({
			authenticated: true,
			server: (this.auth as SessionAuthed).server,
			user: {
				...refresh,
				email: (this.auth as SessionAuthed).user?.email,
				emailConfirmed: (this.auth as SessionAuthed).user?.emailConfirmed,
			},
		});

	public auth: SessionAuth = $state(
		JSON.parse(localStorage.getItem(sessionStorageKey) || '{"authenticated":false}'),
	);
	public savedAuth: SavedAuth[] = $state(
		JSON.parse(localStorage.getItem(savedAuthStorageKey) ?? '[]'),
	);
	public preferences: PreferenceManager = new PreferenceManager(this);

	public atproto: HTTPAtprotoClient = $derived(
		new HTTPAtprotoClient(
			this.auth.authenticated ?
				{
					auth: this.auth.user.accessJwt,
					refreshAuth: this.auth.user.refreshJwt,
					userDid: this.auth.user.did,
				}
			:	{},
			this._refreshSession,
		),
	);

	public async login(details: AuthCredentials, server?: string): Promise<void> {
		const data = await HTTPAtprotoClient.login(details);

		if (data.ok) {
			this.auth = { authenticated: true, server: server ?? defaultAppApiUrl, user: data.content };
		} else throw new Error(data.errorDescription);
	}

	public logout(): void {
		this.auth = { authenticated: false };
	}

	public setAuth(auth: SessionAuth) {
		this.auth = auth;
		localStorage.setItem(sessionStorageKey, JSON.stringify(auth));
	}

	private modifySavedAuths(newAuths: SavedAuth[]) {
		this.savedAuth = newAuths;
		localStorage.setItem(savedAuthStorageKey, JSON.stringify(this.savedAuth));
	}

	public saveAccount(details: SavedAuth) {
		this.modifySavedAuths([
			details,
			...this.savedAuth.filter((x) => x.identifier !== details.identifier),
		]);
	}

	public removeSavedAccount(identifier: string) {
		this.modifySavedAuths(this.savedAuth.filter((x) => x.identifier === identifier));
	}
}

export const [getSession, setSession] = createContext<Session>();
