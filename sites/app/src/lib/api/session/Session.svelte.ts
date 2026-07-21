import { createContext } from 'svelte';
import HTTPAtprotoClient from '../http/HTTPAtprotoClient.ts';
import PreferenceManager from '../preferences/PreferenceManager.ts';
import { defaultPds } from '../api.config.ts';
import type {
	AuthCredentials,
	SavedAuth,
	SessionAuth,
	SessionAuthed,
	SessionAuthRefresh,
	SessionAuthUser,
} from './types.ts';

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

	public async login(
		details: AuthCredentials,
		save: boolean,
		server: string,
	): Promise<SessionAuthUser> {
		const data = await HTTPAtprotoClient.login(details);

		if (save) this.saveAccount({ handle: data.handle, email: data.email, server });

		this.setAuth({ authenticated: true, server: server ?? defaultPds, user: data });

		return data;
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
			...this.savedAuth.filter((x) => x.handle !== details.handle && x.email !== details.email),
		]);
	}

	public removeSavedAccount(details: Partial<Pick<SavedAuth, 'email' | 'handle'>>) {
		this.modifySavedAuths(
			this.savedAuth.filter((x) => x.handle !== details.handle && x.email !== details.email),
		);
	}
}

export const [getSession, setSession] = createContext<Session>();
