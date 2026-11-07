import { createContext } from 'svelte';
import HTTPAtprotoClient from '../../api/http/HTTPAtprotoClient.ts';
import PreferenceManager from '../../api/preferences/PreferenceManager.ts';
import type {
	CachedAuth,
	AuthenticationAny,
	Authenticated,
	AuthResultRefresh,
	AuthResultLogin,
} from './types.ts';

export class AuthContext {
	public static authStorageKey = 'session';
	public static cachedAuthStorageKey = 'frozen';

	public auth: AuthenticationAny = $state(
		JSON.parse(localStorage.getItem(AuthContext.authStorageKey) || '{"authenticated":false}'),
	);
	public savedAuth: CachedAuth[] = $state(
		JSON.parse(localStorage.getItem(AuthContext.cachedAuthStorageKey) ?? '[]'),
	);
	public preferences: PreferenceManager = new PreferenceManager(this);

	private _refreshSession = (refresh: AuthResultRefresh) =>
		this.setAuth({
			authenticated: true,
			server: (this.auth as Authenticated).server,
			user: {
				...refresh,
				email: (this.auth as Authenticated).user?.email,
				emailConfirmed: (this.auth as Authenticated).user?.emailConfirmed,
			},
		});

	public atproto: HTTPAtprotoClient = $derived(
		new HTTPAtprotoClient(
			this.auth.authenticated ?
				{
					auth: this.auth.user.accessJwt,
					refreshAuth: this.auth.user.refreshJwt,
					userDid: this.auth.user.did,
					url: this.auth.server,
				}
			:	{},
			this._refreshSession,
		),
	);

	public async login(
		details: { identifier: string; password: string },
		save: boolean,
		server: string,
	): Promise<AuthResultLogin> {
		const data = await HTTPAtprotoClient.login(details, { url: server });

		if (save) this.saveAccount({ handle: data.handle, email: data.email, server });

		this.setAuth({ authenticated: true, server: server, user: data });

		return data;
	}

	public logout(): void {
		this.auth = { authenticated: false };
	}

	public setAuth(auth: AuthenticationAny) {
		this.auth = auth;
		localStorage.setItem(AuthContext.authStorageKey, JSON.stringify(auth));
	}

	public saveAccount(details: CachedAuth) {
		this._modifySavedAuths([
			details,
			...this.savedAuth.filter((x) => x.handle !== details.handle && x.email !== details.email),
		]);
	}

	public removeSavedAccount(details: Partial<Pick<CachedAuth, 'email' | 'handle'>>) {
		this._modifySavedAuths(
			this.savedAuth.filter((x) => x.handle !== details.handle && x.email !== details.email),
		);
	}
	private _modifySavedAuths(newAuths: CachedAuth[]) {
		this.savedAuth = newAuths;
		localStorage.setItem(AuthContext.cachedAuthStorageKey, JSON.stringify(this.savedAuth));
	}
}

export const [getAuth, setAuth] = createContext<AuthContext>();
