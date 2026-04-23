import {
    defaultXrpcPrefix,
    defaultAppApiUrl,
} from "api.config";
import type {
    HttpResponseError,
    HttpResponseOkWithContent,
    HttpResponseWithContent,
} from "./HTTPResponse";
import type { HTTPRefreshLogin } from "./HTTPErrorHandler";
import type { SessionAuthRefresh, SessionBasic } from "~/context/session/types";
import type {
    AtprotoRecord,
    GetRecordListResponse,
    PutRecordResponse,
} from "types/atproto/record";
import HTTPPreferenceManager from "./preference";
import type { GetSession } from "types/atproto/session";
import HTTPAccountManager from "./account";
import type { DescribedServer } from "types/atproto/server";
import HTTPProfilePostRecordManager from "./profilePostRecord";
import HTTPBackendClient from "./HTTPBackendClient";
import type { CampsiteViewBasic, CreateCampsiteOutput } from "types/campground/campsites";
import HTTPProfileRecordManager from "./profileRecord";
import HTTPInviteGlobalManager from "./inviteGlobal";

type HTTPMethodXRPC = "GET" | "POST";
type HTTPMethod =
    | HTTPMethodXRPC
    | "DELETE"
    | "OPTION"
    | "HEAD"
    | "PUT"
    | "PATCH";

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
        url: defaultAppApiUrl,
        routePrefix: defaultXrpcPrefix,
        // auth: `...`,
        // refreshAuth: `...`,
        // userDid: `...`,
    };

    private _config: HTTPConfig;
    private _onRefreshLogin?: HTTPRefreshLogin;

    public invitesGlobal = new HTTPInviteGlobalManager(this);
    public account = new HTTPAccountManager(this);
    public profileRecords = new HTTPProfileRecordManager(this);
    public profilePostRecords = new HTTPProfilePostRecordManager(this);
    public preference = new HTTPPreferenceManager(this);

    constructor(
        config: Partial<HTTPConfig>,
        onRefreshLogin?: HTTPRefreshLogin,
    ) {
        this._config = { ...HTTPAtprotoClient._default, ...config };
        this._onRefreshLogin = onRefreshLogin;
    }

    public get authExpired(): boolean | null {
        try {
            return this._config.auth
                ? JSON.parse(atob(this._config.auth?.split(".")[1]!)).exp *
                      1000 <
                      new Date().getTime()
                : null;
        } catch (err) {
            console.warn(err);
            return null;
        }
    }

    public get actorDid() {
        return this._config.userDid;
    }

    public static login(
        auth: { identifier: string; password: string },
        requestConfig: Partial<RequestPrefixed> = {},
    ) {
        return HTTPAtprotoClient.atprotoFetch({
            method: "POST",
            route: "com.atproto.server.createSession",
            body: { ...auth, allowTakenDown: true },
            ...requestConfig,
        });
    }

    public static describeServer(requestConfig: Partial<RequestPrefixed> = {}) {
        return HTTPAtprotoClient.atprotoFetch<DescribedServer>({
            method: "GET",
            route: "com.atproto.server.describeServer",
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
            method: "POST",
            route: `com.atproto.server.createAccount`,
            body: props,
            ...requestConfig,
        });
    }

    private static convertValueToArray([key, value]: [string, any]) {
        return Array.isArray(value)
            ? value
                  .filter((y) => typeof y !== "undefined" && y !== null)
                  .map((y) => [key, y.toString()])
            : [[key, value.toString()]];
    }

    public static convertObjectToQuery(
        value: Record<string, any>,
    ): URLSearchParams {
        const newValue = Object.entries(value)
            .filter(([_, key]) => typeof key !== "undefined" && key !== null)
            .flatMap(this.convertValueToArray);
        return new URLSearchParams(newValue);
    }

    public static async atprotoFetch<T = any | null>(
        config: Partial<RequestPrefixed> &
            RequestConfig & { headers?: HeadersInit },
    ): Promise<HttpResponseWithContent<T>> {
        const {
            url,
            queries,
            routePrefix,
            route,
            method,
            body,
            request,
            mode,
            headers,
        } = { ...this._default, ...config };

        const queriesString = queries
            ? `?${this.convertObjectToQuery(queries)}`
            : ``;

        const resolvedUrl = `${url}${routePrefix}${route}${queriesString}`;

        const response = await fetch(resolvedUrl, {
            method,
            body: body ? JSON.stringify(body) : null,
            mode,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...request,
        });

        // Not using response.json() directly, since PDS seems to give empty strings instead
        const responseBodyRaw = response.body ? await response.text() : null;
        const responseBody = responseBodyRaw ? JSON.parse(responseBodyRaw) : null;

        if (!response.ok)
            return {
                ok: false,
                url: response.url,
                status: response.status,
                content: undefined,
                errorHeader: responseBody?.message ? responseBody.error : null,
                errorDescription:
                    responseBody?.message ??
                    responseBody?.error ??
                    "Unknown error",
            } satisfies HttpResponseError;
        else
            return {
                ok: true,
                url: response.url,
                status: response.status,
                content: responseBody as T,
                errorHeader: undefined,
                errorDescription: undefined,
            } satisfies HttpResponseOkWithContent<T>;
    }

    public async refreshSession(requestConfig: Partial<RequestPrefixed> = {}) {
        const resp = await HTTPAtprotoClient.atprotoFetch<SessionAuthRefresh>({
            method: "POST",
            route: "com.atproto.server.refreshSession",
            headers: {
                Authorization: `Bearer ${this._config.refreshAuth}`,
            },
            ...requestConfig,
        });
        if (!resp.ok) return resp;
        this._onRefreshLogin?.(resp.content!);
        // Change in HTTP as well
        this._config.auth = resp.content?.accessJwt ?? this._config.auth;
        this._config.refreshAuth =
            resp.content?.refreshJwt ?? this._config.refreshAuth;
        return resp;
    }

    public async getSession() {
        return this.get<GetSession>({ 
            route: "com.atproto.server.getSession",
        });
    }

    public async fetchUnauthed<T>({
        method,
        body,
        queries,
        route,
        request,
    }: RequestConfig) {
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
                    ...(this._config.auth
                        ? { Authorization: `Bearer ${auth}` }
                        : {}),
                },
            });

        if (!this._config.auth) return doFetch(undefined);

        console.log("Expired", this.authExpired);
        const token = this.authExpired
            ? await this.refreshSession().then((refresh) =>
                  refresh.ok ? refresh.content!.accessJwt : this._config.auth,
              )
            : this._config.auth;

        const resp = await doFetch(token);
        if (!resp.ok && resp.errorHeader === "ExpiredToken") {
            console.log("Expired token", this.authExpired);
            return this.refreshSession().then((refresh) =>
                refresh.ok ? doFetch(refresh.content!.accessJwt) : refresh,
            );
        }
        return resp;
    }

    public fetch<T>(request: RequestConfig) {
        if (!this.actorDid)
            throw new Error("This ATProtocol route requires authentication");

        return this.fetchUnauthed<T>(request);
    }
    
    public fetchProxiedUnauthed<T>(proxy: string, request: RequestConfig) {
        return this.fetchUnauthed<T>({
            ...request,
            request: {
                ...request.request,
                headers: {
                    "atproto-proxy": proxy,
                    ...request.request?.headers
                }
            }
        });
    }

    public fetchProxied<T>(domain: string, request: RequestConfig) {
        if (!this.actorDid)
            throw new Error("This ATProtocol route requires authentication");

        return this.fetchProxiedUnauthed<T>(HTTPBackendClient.getProxyFromDomain(domain), request);
    }
    
    public get<T>(config: Omit<RequestConfig, "method" | "body">) {
        return this.fetch<T>({ method: "GET", ...config });
    }
    public post<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "POST", ...config });
    }
    public getUnauthed<T>(config: Omit<RequestConfig, "method" | "body">) {
        return this.fetchUnauthed<T>({ method: "GET", ...config });
    }
    public postUnauthed<T>(config: Omit<RequestConfig, "method">) {
        return this.fetchUnauthed<T>({ method: "POST", ...config });
    }

    public getRecord<T>(config: {
        repo: string;
        rkey: string;
        collection: string;
    }) {
        return this.fetchUnauthed<AtprotoRecord<T>>({
            method: "GET",
            route: "com.atproto.repo.getRecord",
            queries: config,
        });
    }
    public getRecordList<T>(config: {
        repo: string;
        collection: string;
    }) {
        return this.fetchUnauthed<GetRecordListResponse<T>>({
            method: "GET",
            route: "com.atproto.repo.listRecords",
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
            method: "POST",
            route: "com.atproto.repo.putRecord",
            body: {
                ...config,
                collection,
                record: { ...record, $type: collection },
            },
        });
    }
    public deleteRecord(config: {
        repo: string;
        rkey: string;
        collection: string;
    }) {
        return this.fetchUnauthed<PutRecordResponse>({
            method: "POST",
            route: "com.atproto.repo.deleteRecord",
            body: config,
        });
    }
    public getServiceAuth(config: { aud: string; exp?: number; lxm?: string }) {
        return this.get<{ token: string }>({
            route: "com.atproto.server.getServiceAuth",
            queries: config,
        });
    }

    public getBackendJoinedCampsites(domain: string) {
        return this.fetchProxied<{ campsites: CampsiteViewBasic[] }>(domain, {
            method: "GET",
            route: `gg.campground.campsite.getActorCampsites`,
        })
            .then((resp) =>
                resp.ok
                ? {...resp, content: {...resp.content, domain } } as HttpResponseOkWithContent<{ campsites: CampsiteViewBasic[]; domain: string; }>
                : resp
            );
    }
    public createCampsiteInBackend(domain: string, body: { avatar?: string; name: string; description: string; tags: string[]; vanityUrl?: string | null; }) {
        return this.fetchProxied<CreateCampsiteOutput>(domain, {
            method: "POST",
            route: "gg.campground.campsite.createCampsite",
            body,
        });
    }
}
