import { defaultXrpcPrefix, defaultAppApiUrl, defaultBackendDomain } from "api.config";
import type { RestResponseError, RestResponseOkWithContent, RestResponseWithContent } from "./RESTResponse";
import type { User, UserPostBasic, UserPostDetailed } from "types/user";
import type { RESTRefreshLogin } from "./RESTErrorHandler";
import type { SessionAuthRefresh } from "~/session/types";
import type { AtprotoRecord, AtprotoValueBase, GetRecordListResponse, PutRecordResponse } from "types/record";

type HTTPMethod = "GET" | "OPTION" | "PUT" | "POST" | "PATCH" | "DELETE";

export interface RequestPrefixed {
    url: string;
    routePrefix: string;
}
export interface RESTClientConfig extends RequestPrefixed {
    atprotoProxy: string;
    auth: string;
    refreshAuth: string;
    userDid: string;
};

export interface RequestConfig {
    method: HTTPMethod;
    route: string;
    body?: any;
    request?: RequestInit;
    queries?: Record<string, string>;
}

export default class RESTClient {
    private static _default: RESTClientConfig = {
        url: defaultAppApiUrl,
        routePrefix: defaultXrpcPrefix,
        auth: `...`,
        refreshAuth: `...`,
        userDid: `...`,
        atprotoProxy: `did:web:${defaultBackendDomain.replace(":", "%3A")}#campground_appview`
    };

    private _config: RESTClientConfig;
    private _onRefreshLogin?: RESTRefreshLogin;

    constructor(config: Partial<RESTClientConfig>, onRefreshLogin?: RESTRefreshLogin) {
        this._config = { ...RESTClient._default, ...config };
        this._onRefreshLogin = onRefreshLogin;
    }

    public static login(auth: { identifier: string; password: string; }, requestConfig: Partial<RequestPrefixed> = {}) {
        return RESTClient.atprotoFetch({
            method: "POST",
            route: "com.atproto.server.createSession",
            body: auth,
            ...requestConfig,
        });
    }
    
    public refreshLogin(requestConfig: Partial<RequestPrefixed> = {}) {
        return RESTClient.atprotoFetch<SessionAuthRefresh>({
            method: "POST",
            route: "com.atproto.server.refreshSession",
            headers: {
                "Authorization": `Bearer ${this._config.refreshAuth}`,
            },
            ...requestConfig,
        })
            .then((resp) => {
                if (!resp.ok)
                    return resp;
                this._onRefreshLogin?.(resp.content!);
                // Change in REST as well
                this._config.auth = resp.content?.accessJwt ?? this._config.auth;
                this._config.refreshAuth = resp.content?.refreshJwt ?? this._config.refreshAuth;
                return resp;
            });
    }

    public static atprotoFetch<T = any | null>(config: Partial<RequestPrefixed> & RequestConfig & { headers?: HeadersInit; }): Promise<RestResponseWithContent<T>> {
        const { url, queries, routePrefix, route, method, body, request, headers } = { ...this._default, ...config };

        const queriesString = queries ? `?${new URLSearchParams(queries)}` : ``;

        const resolvedUrl = `${url}${routePrefix}${route}${queriesString}`;

        console.log({ resolvedUrl, queriesString, method });

        return fetch(resolvedUrl, { 
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...request,
        })
            .then(async (response) => {
                const responseBody = response.body ? await response.json() : null;
                if (!response.ok)
                    return { ok: false, url: response.url, status: response.status, content: undefined, errorHeader: responseBody?.message ? responseBody.error : null, errorDescription: responseBody?.message ?? responseBody?.error ?? "Unknown error" } satisfies RestResponseError;
                else
                    return { ok: true, url: response.url, status: response.status, content: responseBody as T, errorHeader: undefined, errorDescription: undefined, } satisfies RestResponseOkWithContent<T>;
            });
    }
    
    fetch<T>({ method, body, queries, route, request }: RequestConfig) {
        const doFetch = (auth: string) => RESTClient.atprotoFetch<T>({
            url: this._config.url,
            routePrefix: this._config.routePrefix,            
            body,
            queries,
            route,
            ...request,

            method,
            headers: {
                "Authorization": `Bearer ${auth}`,
                "atproto-proxy": this._config.atprotoProxy,
                ...request?.headers,
            },
        });

        return doFetch(this._config.auth)
            .then((resp) => {
                if (!resp.ok && resp.errorHeader === "ExpiredToken") {
                    return this.refreshLogin()
                        .then((refresh) =>
                            refresh.ok ? doFetch(refresh.content!.accessJwt) : refresh
                        );
                }
                return resp;
            })
    }
    get<T>(config: Omit<RequestConfig, "method" | "body">) {
        return this.fetch<T>({ method: "GET", ...config });
    }
    getRecord<T extends AtprotoValueBase>(config: { repo: string; rkey: string; collection: string; }) {
        return this.fetch<AtprotoRecord<T>>({ route: "com.atproto.repo.getRecord", queries: config, method: "GET", request: { headers: { "atproto-proxy": "" } }, ...config });
    }
    getRecordList<T extends AtprotoValueBase>(config: { repo: string; collection: string; }) {
        return this.fetch<GetRecordListResponse<T>>({ route: "com.atproto.repo.listRecords", queries: config, method: "GET", request: { headers: { "atproto-proxy": "" } }, ...config });
    }
    putRecord<T>(config: { repo: string; rkey: string; collection: string; record: T; }) {
        return this.fetch<PutRecordResponse>({ route: "com.atproto.repo.putRecord", method: "POST", request: { headers: { "atproto-proxy": "" } }, body: config, ...config });
    }
    post<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "POST", ...config });
    }
    delete<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "DELETE", ...config });
    }
    put<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "PUT", ...config });
    }
    patch<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "PATCH", ...config });
    }
    option<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "OPTION", ...config });
    }

    fetchProfile(actor: string) {
        return this.get<User>({
            route: `gg.campground.actor.getProfile`,
            queries: {
                actor,
            },
        });
    }

    fetchPosts(actor: string) {
        return this.get<{ posts: UserPostBasic[] }>({
            route: `gg.campground.profile.getPosts`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post`,
            },
        });
    }

    fetchPostReplies(actor: string, post_tid: string) {
        return this.get<{ posts: UserPostBasic[] }>({
            route: `gg.campground.profile.getPosts`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post/${post_tid}`,
            },
        });
    }

    fetchPost(actor: string, post_tid: string) {
        return this.get<UserPostDetailed>({
            route: `gg.campground.profile.getPost`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post/${post_tid}`,
            },
        });
    }

    createPost(record: { parentUri?: string | undefined; content: string; tags: string[]; createdAt: string; updatedAt: string; }) {
        return this.putRecord({
            repo: this._config.userDid,
            collection: "gg.campground.profile.post",
            rkey: "",
            record: {
                ...record,
                "$type": "gg.campground.profile.post",
            },
        });
    }
}