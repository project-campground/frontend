import { defaultXrpcPrefix, defaultPds } from '../api.config.js';
import type { HTTPRefreshLogin } from './HTTPErrorHandler.js';
import type { SessionAuthRefresh, SessionAuthUser, SessionBasic } from '$lib/api/session/types.js';
import type {
	AtprotoRecord,
	GetRecordListResponse,
	PutRecordResponse,
} from '$lib/types/atproto/record.js';
import HTTPPreferenceManager from './preference.ts';
import type { GetSession } from '$lib/types/atproto/session.js';
import HTTPAccountManager from './account.ts';
import type { DescribedServer } from '$lib/types/atproto/server.js';
import HTTPProfilePostRecordManager from './profilePostRecord.js';
import HTTPBackendClient from './HTTPBackendClient.js';
import type { CampsiteViewBasic, CreateCampsiteOutput } from '$lib/types/campground/campsites.js';
import HTTPProfileRecordManager from './profileRecord.js';
import HTTPInviteGlobalManager from './inviteGlobal.js';
import XrpcError from '../XrpcError.js';
import HTTPIdentityManager from './identity.js';

type HTTPMethodXRPC = 'GET' | 'POST';
type HTTPMethod = HTTPMethodXRPC | 'DELETE' | 'OPTION' | 'HEAD' | 'PUT' | 'PATCH';

export interface RequestPrefixed {
	url: string;
	mode?: RequestMode;
	routePrefix: string;
}
export interface HTTPConfig extends RequestPrefixed {
	auth?: string;
	refreshAuth?: string;
	userDid?: string;
}

type QueryType = string | number | boolean | undefined | null;

export interface RequestConfig {
	method: HTTPMethod;
	route: string;
	body?: any;
	request?: RequestInit;
	queries?: Record<string, QueryType | QueryType[]>;
}

export default class HTTPAtprotoClient {
	private static _default: HTTPConfig = {
		url: defaultPds,
		routePrefix: defaultXrpcPrefix,
		// auth: `...`,
		// refreshAuth: `...`,
		// userDid: `...`,
	};

	private _config: HTTPConfig;
	private _onRefreshLogin?: HTTPRefreshLogin;

	public invitesGlobal = new HTTPInviteGlobalManager(this);
	public account = new HTTPAccountManager(this);
	public identity = new HTTPIdentityManager(this);
	public profileRecords = new HTTPProfileRecordManager(this);
	public profilePostRecords = new HTTPProfilePostRecordManager(this);
	public preference = new HTTPPreferenceManager(this);

	constructor(config: Partial<HTTPConfig>, onRefreshLogin?: HTTPRefreshLogin) {
		this._config = { ...HTTPAtprotoClient._default, ...config };
		this._onRefreshLogin = onRefreshLogin;
	}

	public get authExpired(): boolean | null {
		try {
			return this._config.auth ?
					JSON.parse(atob(this._config.auth?.split('.')[1]!)).exp * 1000 < new Date().getTime()
				:	null;
		} catch (err) {
			console.warn(err);
			return null;
		}
	}

	public get actorDid() {
		return this._config.userDid;
	}

	public static login(
		{ authFactorToken, ...auth }: { identifier: string; authFactorToken?: string; password: string },
		requestConfig: Partial<RequestPrefixed> = {},
	) {
		return HTTPAtprotoClient.atprotoFetch<SessionAuthUser>({
			method: 'POST',
			route: 'com.atproto.server.createSession',
			body: { ...auth, authFactorToken: authFactorToken ?? '', allowTakenDown: true },
			...requestConfig,
		});
	}

	public static describeServer(requestConfig: Partial<RequestPrefixed> = {}) {
		return HTTPAtprotoClient.atprotoFetch<DescribedServer>({
			method: 'GET',
			route: 'com.atproto.server.describeServer',
			...requestConfig,
		});
	}

	public static register(
		props: {
			email?: string;
			handle: string;
			inviteCode?: string;
			verificationCode?: string;
			verificationPhone?: string;
			recoveryKey?: string;
			password?: string;
			did?: string;
		},
		requestConfig: Partial<RequestPrefixed> = {},
	) {
		return HTTPAtprotoClient.atprotoFetch<SessionBasic & { didDoc: any }>({
			method: 'POST',
			route: `com.atproto.server.createAccount`,
			body: props,
			...requestConfig,
		});
	}

	private static convertValueToArray([key, value]: [string, any]) {
		return Array.isArray(value) ?
				value.filter((y) => typeof y !== 'undefined' && y !== null).map((y) => [key, y.toString()])
			:	[[key, value.toString()]];
	}

	public static convertObjectToQuery(value: Record<string, any>): URLSearchParams {
		const newValue = Object.entries(value)
			.filter(([_, key]) => typeof key !== 'undefined' && key !== null)
			.flatMap(this.convertValueToArray);
		return new URLSearchParams(newValue);
	}

	public static async atprotoFetch<T = any | null>(
		config: Partial<RequestPrefixed> & RequestConfig & { headers?: HeadersInit },
	): Promise<T> {
		const { url, queries, routePrefix, route, method, body, request, mode, headers } = {
			...this._default,
			...config,
		};

		const queriesString = queries ? `?${this.convertObjectToQuery(queries)}` : ``;

		const resolvedUrl = `${url}${routePrefix}${route}${queriesString}`;

		const response = await fetch(resolvedUrl, {
			method,
			body: body ? JSON.stringify(body) : null,
			mode,
			headers: { 'Content-Type': 'application/json', ...headers },
			...request,
		});

		// Not using response.json() directly, since PDS seems to give empty strings instead
		const responseBodyRaw = response.body ? await response.text() : null;
		const responseBody = responseBodyRaw ? JSON.parse(responseBodyRaw) : null;

		if (!response.ok) throw new XrpcError(response, responseBody);

		return responseBody as T;
	}

	public async refreshSession(requestConfig: Partial<RequestPrefixed> = {}) {
		const resp = await HTTPAtprotoClient.atprotoFetch<SessionAuthRefresh>({
			method: 'POST',
			route: 'com.atproto.server.refreshSession',
			headers: { Authorization: `Bearer ${this._config.refreshAuth}` },
			...requestConfig,
		});

		// Any custom handling
		this._onRefreshLogin?.(resp);

		// Change in Atproto client as well
		this._config.auth = resp.accessJwt ?? this._config.auth;
		this._config.refreshAuth = resp.refreshJwt ?? this._config.refreshAuth;

		return resp;
	}

	public async getSession() {
		return this.get<GetSession>({ route: 'com.atproto.server.getSession' });
	}

	public async fetchUnauthed<T>({ method, body, queries, route, request }: RequestConfig) {
		const doFetch = (auth: string | undefined) =>
			HTTPAtprotoClient.atprotoFetch<T>({
				url: this._config.url,
				routePrefix: this._config.routePrefix,
				body,
				queries,
				route,
				...request,

				method,
				headers: {
					...request?.headers,
					...(this._config.auth ? { Authorization: `Bearer ${auth}` } : {}),
				},
			});

		if (!this._config.auth) return doFetch(undefined);

		console.log('Expired', this.authExpired);
		const token =
			this.authExpired ?
				await this.refreshSession()
					.then((refresh) => refresh.accessJwt)
					.catch(() => this._config.auth)
			:	this._config.auth;

		return await doFetch(token).catch(async (e) => {
			if (!(e instanceof XrpcError) || e.code !== 'ExpiredToken') throw e;

			console.log('Expired token', this.authExpired);

			return this.refreshSession().then(async (refresh) => doFetch(refresh!.accessJwt));
		});
	}

	public fetch<T>(request: RequestConfig) {
		if (!this.actorDid) throw new Error('This ATProtocol route requires authentication');

		return this.fetchUnauthed<T>(request);
	}

	public fetchProxiedUnauthed<T>(proxy: string, request: RequestConfig) {
		return this.fetchUnauthed<T>({
			...request,
			request: {
				...request.request,
				headers: { 'atproto-proxy': proxy, ...request.request?.headers },
			},
		});
	}

	public fetchProxied<T>(domain: string, request: RequestConfig) {
		if (!this.actorDid) throw new Error('This ATProtocol route requires authentication');

		return this.fetchProxiedUnauthed<T>(HTTPBackendClient.getProxyFromDomain(domain), request);
	}

	public get<T>(config: Omit<RequestConfig, 'method' | 'body'>) {
		return this.fetch<T>({ method: 'GET', ...config });
	}
	public post<T>(config: Omit<RequestConfig, 'method'>) {
		return this.fetch<T>({ method: 'POST', ...config });
	}
	public getUnauthed<T>(config: Omit<RequestConfig, 'method' | 'body'>) {
		return this.fetchUnauthed<T>({ method: 'GET', ...config });
	}
	public postUnauthed<T>(config: Omit<RequestConfig, 'method'>) {
		return this.fetchUnauthed<T>({ method: 'POST', ...config });
	}

	public getRecord<T>(config: { repo: string; rkey: string; collection: string }) {
		return this.fetchUnauthed<AtprotoRecord<T>>({
			method: 'GET',
			route: 'com.atproto.repo.getRecord',
			queries: config,
		});
	}
	public getRecordList<T>(config: { repo: string; collection: string }) {
		return this.fetchUnauthed<GetRecordListResponse<T>>({
			method: 'GET',
			route: 'com.atproto.repo.listRecords',
			queries: config,
		});
	}
	public putRecord<T>({
		record,
		collection,
		...config
	}: {
		repo: string;
		rkey: string;
		collection: string;
		record: T;
	}) {
		return this.fetch<PutRecordResponse>({
			method: 'POST',
			route: 'com.atproto.repo.putRecord',
			body: { ...config, collection, record: { ...record, $type: collection } },
		});
	}
	public deleteRecord(config: { repo: string; rkey: string; collection: string }) {
		return this.fetchUnauthed<PutRecordResponse>({
			method: 'POST',
			route: 'com.atproto.repo.deleteRecord',
			body: config,
		});
	}
	public getServiceAuth(config: { aud: string; exp?: number; lxm?: string }) {
		return this.get<{ token: string }>({
			route: 'com.atproto.server.getServiceAuth',
			queries: config,
		});
	}

	public getBackendJoinedCampsites(domain: string) {
		return this.fetchProxied<{ campsites: CampsiteViewBasic[] }>(domain, {
			method: 'GET',
			route: `gg.campground.campsite.getActorCampsites`,
		}).then((resp) => ({ ...resp, domain }) as { campsites: CampsiteViewBasic[]; domain: string });
	}
	public createCampsiteInBackend(
		domain: string,
		body: {
			avatar?: string;
			name: string;
			description: string;
			tags: string[];
			vanityUrl?: string | null;
		},
	) {
		return this.fetchProxied<CreateCampsiteOutput>(domain, {
			method: 'POST',
			route: 'gg.campground.campsite.createCampsite',
			body,
		});
	}
}
