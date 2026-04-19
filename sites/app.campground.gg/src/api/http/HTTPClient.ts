import {
    defaultXrpcPrefix,
    defaultAppApiUrl,
    defaultBackendDomain,
} from "api.config";
import type {
    HttpResponseError,
    HttpResponseOkWithContent,
    HttpResponseWithContent,
} from "./HTTPResponse";
import type { ProfileViewEmpty } from "types/campground/user";
import type { HTTPRefreshLogin } from "./HTTPErrorHandler";
import type { SessionAuthRefresh, SessionBasic } from "~/context/session/types";
import type {
    AtprotoRecord,
    AtprotoValueBase,
    GetRecordListResponse,
    PutRecordResponse,
} from "types/atproto/record";
import type { Me } from "types/campground/me";
import HTTPClientTentManager from "./tent";
import HTTPClientCampsiteManager from "./campsite";
import HTTPClientBonfireManager from "./bonfire";
import HTTPClientMessageManager from "./message";
import HTTPClientPermissionManager from "./permission";
import HTTPClientProfilePostManager from "./profilePost";
import HTTPClientRoleManager from "./role";
import HTTPClientCategoryManager from "./category";
import HTTPClientInviteManager from "./invite";
import HTTPClientMemberManager from "./member";
import HTTPClientMemberBanManager from "./memberBan";
import HTTPClientPreferenceManager from "./preference";
import type { GetSession } from "types/atproto/session";
import HTTPClientAccountManager from "./account";
import type { DescribedServer } from "types/atproto/server";

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
export interface HTTPClientConfig extends RequestPrefixed {
    atprotoProxy: string;
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

export default class HTTPClient {
    private static _default: HTTPClientConfig = {
        url: defaultAppApiUrl,
        routePrefix: defaultXrpcPrefix,
        // auth: `...`,
        // refreshAuth: `...`,
        // userDid: `...`,
        atprotoProxy: `did:web:${defaultBackendDomain.replace(":", "%3A")}#campground_appview`,
    };

    private _config: HTTPClientConfig;
    private _onRefreshLogin?: HTTPRefreshLogin;
    public account = new HTTPClientAccountManager(this);

    public profilePosts = new HTTPClientProfilePostManager(this);

    public campsites = new HTTPClientCampsiteManager(this);

    public members = new HTTPClientMemberManager(this);
    public roles = new HTTPClientRoleManager(this);
    public memberBans = new HTTPClientMemberBanManager(this);
    public invites = new HTTPClientInviteManager(this);

    public bonfires = new HTTPClientBonfireManager(this);
    public categories = new HTTPClientCategoryManager(this);
    public tents = new HTTPClientTentManager(this);

    public permissions = new HTTPClientPermissionManager(this);
    public messages = new HTTPClientMessageManager(this);

    public preference = new HTTPClientPreferenceManager(this);

    constructor(
        config: Partial<HTTPClientConfig>,
        onRefreshLogin?: HTTPRefreshLogin,
    ) {
        this._config = { ...HTTPClient._default, ...config };
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
        return HTTPClient.atprotoFetch({
            method: "POST",
            route: "com.atproto.server.createSession",
            body: { ...auth, allowTakenDown: true },
            ...requestConfig,
        });
    }

    public static describeServer(
        requestConfig: Partial<RequestPrefixed> = {},
    ) {
        return HTTPClient.atprotoFetch<DescribedServer>({
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
        return HTTPClient.atprotoFetch<SessionBasic & { didDoc: any }>({
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
        const responseBody = response.body ? await response.json() : null;
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
        const resp = await HTTPClient.atprotoFetch<SessionAuthRefresh>({
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
        return this.fetchPDS<GetSession>("GET", "com.atproto.server.getSession", {});
    }

    private async fetch<T>({
        method,
        body,
        queries,
        route,
        request,
    }: RequestConfig) {
        const doFetch = (auth: string | undefined) =>
            HTTPClient.atprotoFetch<T>({
                url: this._config.url,
                routePrefix: this._config.routePrefix,
                body,
                queries,
                route,
                ...request,

                method,
                headers: {
                    "atproto-proxy": this._config.atprotoProxy,
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
    public get<T>(config: Omit<RequestConfig, "method" | "body">) {
        return this.fetch<T>({ method: "GET", ...config });
    }
    public post<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "POST", ...config });
    }

    public fetchPDS<T>(
        method: HTTPMethodXRPC,
        nsid: string,
        request: Omit<RequestConfig, "route" | "method">,
    ) {
        return this.fetch<T>({
            route: nsid,
            method,
            request: { headers: { "atproto-proxy": "" } },
            ...request,
        });
    }
    public fetchPDSAuthed<T>(
        method: HTTPMethodXRPC,
        nsid: string,
        request: Omit<RequestConfig, "route" | "method">,
    ) {
        if (!this.actorDid)
            throw new Error("This ATProtocol route requires authentication");

        return this.fetchPDS<T>(method, nsid, request);
    }
    public getRecord<T extends AtprotoValueBase>(config: {
        repo: string;
        rkey: string;
        collection: string;
    }) {
        return this.fetchPDS<AtprotoRecord<T>>(
            "GET",
            "com.atproto.repo.getRecord",
            { queries: config },
        );
    }
    public getRecordList<T extends AtprotoValueBase>(config: {
        repo: string;
        collection: string;
    }) {
        return this.fetchPDS<GetRecordListResponse<T>>(
            "GET",
            "com.atproto.repo.listRecords",
            { queries: config },
        );
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
        return this.fetchPDS<PutRecordResponse>(
            "POST",
            "com.atproto.repo.putRecord",
            {
                body: {
                    ...config,
                    collection,
                    record: { ...record, $type: collection },
                },
            },
        );
    }
    public deleteRecord(config: {
        repo: string;
        rkey: string;
        collection: string;
    }) {
        return this.fetchPDS<PutRecordResponse>(
            "POST",
            "com.atproto.repo.deleteRecord",
            { body: config },
        );
    }
    public getServiceAuth(config: { exp?: number; lxm?: string }) {
        return this.fetchPDS<{ token: string }>(
            "GET",
            "com.atproto.server.getServiceAuth",
            {
                queries: {
                    aud: this._config.atprotoProxy.split("#", 1)[0],
                    ...config,
                },
            },
        );
    }

    public getMe() {
        return this.get<Me>({
            route: `gg.campground.actor.getMe`,
        });
    }

    public getProfile(actor: string) {
        return this.get<ProfileViewEmpty>({
            route: `gg.campground.actor.getProfile`,
            queries: {
                actor,
            },
        });
    }
}
