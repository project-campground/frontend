import { defaultXrpcPrefix, defaultAppApiUrl, defaultBackendDomain } from "api.config";
import type { HttpResponseError, HttpResponseOkWithContent, HttpResponseWithContent } from "./HTTPResponse";
import type { ProfileView, ProfilePostViewBasic, ProfilePostViewDetailed, ProfilePostViewParented } from "types/user";
import type { HTTPRefreshLogin } from "./HTTPErrorHandler";
import type { SessionAuthRefresh } from "~/context/session/types";
import type { AtprotoRecord, AtprotoValueBase, GetRecordListResponse, PutRecordResponse } from "types/record";
import type { Me } from "types/me";
import type { BonfireViewBasic, BonfireViewDetailed, CampsiteMemberViewDetailed, CampsitePermissionView, CampsiteRoleView, CampsiteViewBasic, CampsiteViewDetailed, CreateCampsiteOutput, GetMembersDetailedOutput, GetMembersOutput, GetPermissionsOutput, GetRolesOutput } from "types/campsites";
import type { GetTentsOutput, TentCategoryView, TentViewDetailed } from "types/tent";
import type { GetTentMessagesOutput, TentMessageViewBasic } from "types/content";
import type { CampsiteBanView, CampsiteInviteViewBasic, CampsiteInviteViewDetailed, GetBansOutput, GetInvitesOutput } from "types/membership";

type HTTPMethodXRPC = "GET" | "POST";
type HTTPMethod = HTTPMethodXRPC | "DELETE" | "OPTION" | "HEAD" | "PUT" | "PATCH";

export interface RequestPrefixed {
    url: string;
    routePrefix: string;
}
export interface HTTPClientConfig extends RequestPrefixed {
    atprotoProxy: string;
    auth?: string;
    refreshAuth?: string;
    userDid?: string;
};

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
        atprotoProxy: `did:web:${defaultBackendDomain.replace(":", "%3A")}#campground_appview`
    };

    private _config: HTTPClientConfig;
    private _onRefreshLogin?: HTTPRefreshLogin;

    constructor(config: Partial<HTTPClientConfig>, onRefreshLogin?: HTTPRefreshLogin) {
        this._config = { ...HTTPClient._default, ...config };
        this._onRefreshLogin = onRefreshLogin;
    }

    public get authExpired(): boolean | null {
        try {
            return this._config.auth ? JSON.parse(atob(this._config.auth?.split(".")[1]!)).exp * 1000 < new Date().getTime() : null;
        } catch(err) {
            console.warn(err);
            return null;
        }
    }

    public static login(auth: { identifier: string; password: string; }, requestConfig: Partial<RequestPrefixed> = {}) {
        return HTTPClient.atprotoFetch({
            method: "POST",
            route: "com.atproto.server.createSession",
            body: auth,
            ...requestConfig,
        });
    }
    
    public async refreshLogin(requestConfig: Partial<RequestPrefixed> = {}) {
        const resp = await HTTPClient.atprotoFetch<SessionAuthRefresh>({
            method: "POST",
            route: "com.atproto.server.refreshSession",
            headers: {
                "Authorization": `Bearer ${this._config.refreshAuth}`,
            },
            ...requestConfig,
        });
        if (!resp.ok)
            return resp;
        this._onRefreshLogin?.(resp.content!);
        // Change in REST as well
        this._config.auth = resp.content?.accessJwt ?? this._config.auth;
        this._config.refreshAuth = resp.content?.refreshJwt ?? this._config.refreshAuth;
        return resp;
    }

    private static convertValueToArray([key, value]: [string, any]) {
        return Array.isArray(value)
            ? value.filter((y) => typeof y !== "undefined" && y !== null).map((y) => [key, y.toString()])
            : [[key, value.toString()]];
    }

    public static convertObjectToQuery(value: Record<string, any>): URLSearchParams {
        const newValue = (
            Object
                .entries(value)
                .filter(([_, key]) => typeof key !== "undefined" && key !== null)
                .flatMap(this.convertValueToArray)
        );
        return new URLSearchParams(newValue);
    }

    public static async atprotoFetch<T = any | null>(config: Partial<RequestPrefixed> & RequestConfig & { headers?: HeadersInit; }): Promise<HttpResponseWithContent<T>> {
        const { url, queries, routePrefix, route, method, body, request, headers } = { ...this._default, ...config };

        const queriesString = queries ? `?${this.convertObjectToQuery(queries)}` : ``;

        const resolvedUrl = `${url}${routePrefix}${route}${queriesString}`;

        const response = await fetch(resolvedUrl, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...request,
        });
        const responseBody = response.body ? await response.json() : null;
        if (!response.ok)
            return { ok: false, url: response.url, status: response.status, content: undefined, errorHeader: responseBody?.message ? responseBody.error : null, errorDescription: responseBody?.message ?? responseBody?.error ?? "Unknown error" } satisfies HttpResponseError;

        else
            return { ok: true, url: response.url, status: response.status, content: responseBody as T, errorHeader: undefined, errorDescription: undefined, } satisfies HttpResponseOkWithContent<T>;
    }
    
    async fetch<T>({ method, body, queries, route, request }: RequestConfig) {
        const doFetch = (auth: string | undefined) => HTTPClient.atprotoFetch<T>({
            url: this._config.url,
            routePrefix: this._config.routePrefix,            
            body,
            queries,
            route,
            ...request,
            
            method,
            headers:{
                "atproto-proxy": this._config.atprotoProxy,
                ...request?.headers,
                ...(this._config.auth ? { "Authorization": `Bearer ${auth}` } : {})
            },
        });

        if (!this._config.auth)
            return doFetch(undefined);

        console.log("Expired", this.authExpired);
        const token = this.authExpired
            ? await this.refreshLogin().then((refresh) => refresh.ok ? refresh.content!.accessJwt : this._config.auth)
            : this._config.auth;

        const resp = await doFetch(token);
        if (!resp.ok && resp.errorHeader === "ExpiredToken") {
            console.log("Expired token", this.authExpired);
            return this.refreshLogin()
                .then((refresh) => refresh.ok ? doFetch(refresh.content!.accessJwt) : refresh);
        }
        return resp;
    }
    get<T>(config: Omit<RequestConfig, "method" | "body">) {
        return this.fetch<T>({ method: "GET", ...config });
    }
    post<T>(config: Omit<RequestConfig, "method">) {
        return this.fetch<T>({ method: "POST", ...config });
    }

    fetchPDS<T>(method: HTTPMethodXRPC, nsid: string, request: Omit<RequestConfig, "route" | "method">) {
        return this.fetch<T>({ route: nsid, method, request: { headers: { "atproto-proxy": "" } }, ...request });
    }
    getRecord<T extends AtprotoValueBase>(config: { repo: string; rkey: string; collection: string; }) {
        return this.fetchPDS<AtprotoRecord<T>>("GET", "com.atproto.repo.getRecord", { queries: config });
    }
    getRecordList<T extends AtprotoValueBase>(config: { repo: string; collection: string; }) {
        return this.fetchPDS<GetRecordListResponse<T>>("GET", "com.atproto.repo.listRecords", { queries: config });
    }
    putRecord<T>(config: { repo: string; rkey: string; collection: string; record: T; }) {
        return this.fetchPDS<PutRecordResponse>("POST", "com.atproto.repo.putRecord", { body: config, });
    }
    deleteRecord(config: { repo: string; rkey: string; collection: string; }) {
        return this.fetchPDS<PutRecordResponse>("POST", "com.atproto.repo.deleteRecord", { body: config, });
    }
    getServiceAuth(config: { exp?: number; lxm?: string; }) {
        return this.fetchPDS<{ token: string; }>("GET", "com.atproto.server.getServiceAuth", { queries: { aud: this._config.atprotoProxy.split("#", 1)[0], ...config } });
    }

    getMe() {
        return this.get<Me>({
            route: `gg.campground.actor.getMe`,
        });
    }

    fetchProfile(actor: string) {
        return this.get<ProfileView>({
            route: `gg.campground.actor.getProfile`,
            queries: {
                actor,
            },
        });
    }

    fetchPosts(actor: string, replies: boolean = false, offset: number = 0, limit: number = 50) {
        return this.get<{ posts: ProfilePostViewParented[] }>({
            route: `gg.campground.profile.getPosts`,
            queries: {
                actor: actor,
                limit,
                offset,
                replies,
            },
        });
    }

    fetchPostReplies(actor: string, post_tid: string, offset: number = 0) {
        return this.get<{ posts: ProfilePostViewBasic[] }>({
            route: `gg.campground.profile.getReplies`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post/${post_tid}`,
                limit: "50",
                offset: offset.toString(),
            },
        });
    }

    fetchPost(actor: string, post_tid: string) {
        return this.get<ProfilePostViewDetailed>({
            route: `gg.campground.profile.getPost`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post/${post_tid}`,
            },
        });
    }

    unindexPost(uri: string) {
        return this.post<ProfilePostViewDetailed>({
            route: `gg.campground.profile.unindexPost`,
            queries: {
                uri,
            },
        });
    }

    createPost(record: { parentUri?: string | undefined; content: string; tags: string[]; createdAt: string; updatedAt: string; }) {
        if (!this._config.userDid)
            throw new Error("Operation not allowed while unauthenticated");
        
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
    
    updatePost(uri: string, record: { content?: string; tags?: string[]; }) {
        if (!this._config.userDid)
            throw new Error("Operation not allowed while unauthenticated");
        
        return this.putRecord({
            repo: this._config.userDid,
            collection: "gg.campground.profile.post",
            rkey: uri.split("/")[4],
            record: {
                ...record,
                "updatedAt": new Date().toISOString(),
                "$type": "gg.campground.profile.post",
            },
        });
    }
    
    async deletePost(uri: string) {
        if (!this._config.userDid)
            throw new Error("Operation not allowed while unauthenticated");

        const a = await this.deleteRecord({
            repo: this._config.userDid,
            collection: "gg.campground.profile.post",
            // at://did:.../gg.campground.profile.post/...
            rkey: uri.split("/")[4],
        });
        await this.unindexPost(uri);
        return a;
    }

    getCampsite(campsite_id: string) {
        return this.get<CampsiteViewDetailed>({
            route: "gg.campground.campsite.getCampsite",
            queries: { campsite_id },
        });
    }

    createCampsite(body: { avatar?: string; name: string; description: string; tags: string[]; vanityUrl?: string | null; }) {
        return this.post<CreateCampsiteOutput>({
            route: "gg.campground.campsite.createCampsite",
            body,
        });
    }

    updateCampsite(campsite_id: string, body: { avatarUri?: string; bannerUri?: string; name?: string; description?: string; tags?: string[]; vanityUrl?: string | null; }) {
        return this.post<CampsiteViewBasic>({
            route: "gg.campground.campsite.updateCampsite",
            queries: { campsite_id, },
            body,
        });
    }

    deleteCampsite(campsite_id: string) {
        return this.post<null>({
            route: "gg.campground.campsite.deleteCampsite",
            queries: { campsite_id, },
        });
    }
    
    getBonfire(campsite_id: string, bonfire_id: string) {
        return this.get<BonfireViewDetailed>({
            route: "gg.campground.campsite.getBonfire",
            queries: { campsite_id, bonfire_id, },
        });
    }

    createBonfire(campsite_id: string, body: { name: string, description: string; priority: number; }) {
        return this.post<BonfireViewDetailed>({
            route: "gg.campground.campsite.createBonfire",
            queries: { campsite_id },
            body,
        });
    }
    
    updateBonfire(campsite_id: string, bonfire_id: string, body: { name?: string, description?: string; priority?: number; avatarUri?: string; bannerUri?: string; }) {
        return this.post<BonfireViewBasic>({
            route: "gg.campground.campsite.updateBonfire",
            queries: { campsite_id, bonfire_id },
            body,
        });
    }
    
    deleteBonfire(campsite_id: string, bonfire_id: string) {
        return this.post<BonfireViewBasic>({
            route: "gg.campground.campsite.deleteBonfire",
            queries: { campsite_id, bonfire_id },
        });
    }

    getRoles(campsite_id: string) {
        return this.post<GetRolesOutput>({
            route: "gg.campground.campsite.getRoles",
            queries: { campsite_id },
        });
    }

    createRole(campsite_id: string, body: { name: string, color: number; colorSecondary: number; displaySeparately: boolean; mentionable: boolean; campsitePermissions: number; tentPermissions: number; }) {
        return this.post<CampsiteRoleView>({
            route: "gg.campground.campsite.createRole",
            queries: { campsite_id },
            body,
        });
    }
    
    updateRole(campsite_id: string, role_id: string, body: { name?: string, color?: number; colorSecondary?: number; displaySeparately?: boolean; mentionable?: boolean; campsitePermissions?: number; tentPermissions?: number; }) {
        return this.post<CampsiteRoleView>({
            route: "gg.campground.campsite.updateRole",
            queries: { campsite_id, role_id },
            body,
        });
    }
    
    moveRoles(campsite_id: string, body: { roleByPriority: Record<string, number>; }) {
        return this.post<GetRolesOutput>({
            route: "gg.campground.campsite.moveRoles",
            queries: { campsite_id, },
            body,
        });
    }
    
    deleteRole(campsite_id: string, role_id: string) {
        return this.post<CampsiteRoleView>({
            route: "gg.campground.campsite.deleteRole",
            queries: { campsite_id, role_id },
        });
    }

    getMembers(campsite_id: string, offsetOrIds: string[] | number) {
        return this.get<GetMembersOutput>({
            route: "gg.campground.membership.getMembers",
            queries: {
                campsite_id,
                offset: typeof offsetOrIds === "number"
                ? offsetOrIds.toString()
                : null,
                actors: Array.isArray(offsetOrIds)
                ? offsetOrIds
                : null
            },
        });
    }

    getMembersDetailed(campsite_id: string, offset: number) {
        return this.get<GetMembersDetailedOutput>({
            route: "gg.campground.membership.getMembersDetailed",
            queries: {
                campsite_id,
                offset,
            },
        });
    }

    getMember(campsite_id: string, actor: string) {
        return this.get<CampsiteMemberViewDetailed>({
            route: "gg.campground.membership.getMember",
            queries: {
                campsite_id,
                actor,
            },
        });
    }

    removeMember(campsite_id: string, actor: string) {
        return this.get<null>({
            route: "gg.campground.membership.removeMember",
            queries: {
                campsite_id,
                actor,
            },
        });
    }
    
    leaveCampsite(campsite_id: string) {
        return this.get<null>({
            route: "gg.campground.membership.removeMember",
            queries: {
                campsite_id,
            },
        });
    }

    getInvite(invite_id: string) {
        return this.get<CampsiteInviteViewDetailed>({
            route: "gg.campground.membership.getInvite",
            queries: {
                invite_id,
            },
        });
    }

    getInvites(campsite_id: string, offset: number = 0, limit: number = 50) {
        return this.get<GetInvitesOutput>({
            route: "gg.campground.membership.getInvites",
            queries: {
                campsite_id,
                offset,
                limit,
            },
        });
    }
    
    useInvite(invite_id: string) {
        return this.post<null>({
            route: "gg.campground.membership.useInvite",
            queries: {
                invite_id,
            },
        });
    }
    
    createInvite(campsite_id: string, body: Pick<CampsiteInviteViewBasic, "allowedAmount" | "expiresAt">) {
        return this.post<CampsiteInviteViewBasic>({
            route: "gg.campground.membership.createInvite",
            queries: {
                campsite_id,
            },
            body,
        });
    }
    
    deleteInvite(campsite_id: string, invite_id: string) {
        return this.post<CampsiteInviteViewBasic>({
            route: "gg.campground.membership.deleteInvite",
            queries: {
                campsite_id,
                invite_id,
            },
        });
    }

    getBans(campsite_id: string, offset: number = 0, limit: number = 50) {
        return this.get<GetBansOutput>({
            route: "gg.campground.membership.getMemberBans",
            queries: {
                campsite_id,
                offset,
                limit,
            },
        });
    }
    
    banMember(campsite_id: string, actor: string) {
        return this.get<CampsiteBanView>({
            route: "gg.campground.membership.banMember",
            queries: {
                campsite_id,
                actor,
            },
        });
    }
    deleteMemberBan(campsite_id: string, actor: string) {
        return this.get<CampsiteBanView>({
            route: "gg.campground.membership.deleteMemberBan",
            queries: {
                campsite_id,
                actor,
            },
        });
    }
    
    addMemberRole(campsite_id: string, role_id: string, body: { memberIds: string[]; }) {
        return this.post<number>({
            route: "gg.campground.membership.addMemberRoles",
            queries: { campsite_id, role_id },
            body,
        });
    }
    
    removeMemberRole(campsite_id: string, role_id: string, body: { memberIds: string[]; }) {
        return this.post<number>({
            route: "gg.campground.membership.removeMemberRoles",
            queries: { campsite_id, role_id },
            body,
        });
    }
    
    getTents(campsite_id: string, bonfire_id: string) {
        return this.get<GetTentsOutput>({
            route: "gg.campground.tent.getTents",
            queries: { campsite_id, bonfire_id, },
        });
    }
    
    getTent(tent_id: string) {
        return this.get<TentViewDetailed>({
            route: "gg.campground.tent.getTent",
            queries: { tent_id, },
        });
    }
    
    createTent(campsite_id: string, bonfire_id: string, body: { type: number; name: string; description: string; priority: number; }) {
        return this.post<TentViewDetailed>({
            route: "gg.campground.tent.createTent",
            queries: { campsite_id, bonfire_id, },
            body: { viewType: 0, ...body },
        });
    }
    
    updateTent(tent_id: string, body: { name?: string; description?: string; viewType?: number; }) {
        return this.post<TentViewDetailed>({
            route: "gg.campground.tent.updateTent",
            queries: { tent_id, },
            body,
        });
    }
    
    moveTent(tent_id: string, body: { bonfire_id?: string; category_id?: string; priority?: number; }) {
        return this.post<TentViewDetailed>({
            route: "gg.campground.tent.moveTent",
            queries: { tent_id, },
            body,
        });
    }
    
    deleteTent(tent_id: string) {
        return this.post<TentMessageViewBasic>({
            route: "gg.campground.tent.deleteTent",
            queries: { tent_id, },
        });
    }
    
    createCategory(campsite_id: string, bonfire_id: string, body: { name: string; description: string; priority: number; }) {
        return this.post<TentCategoryView>({
            route: "gg.campground.tent.createCategory",
            queries: { campsite_id, bonfire_id, },
            body,
        });
    }
    
    updateCategory(category_id: string, body: { name?: string; description?: string; }) {
        return this.post<TentCategoryView>({
            route: "gg.campground.tent.updateCategory",
            queries: { category_id, },
            body,
        });
    }
    
    moveCategory(category_id: string, body: { bonfire_id?: string; priority?: number; }) {
        return this.post<TentCategoryView>({
            route: "gg.campground.tent.moveCategory",
            queries: { category_id, },
            body,
        });
    }
    
    deleteCategory(category_id: string) {
        return this.post<TentCategoryView>({
            route: "gg.campground.tent.deleteCategory",
            queries: { category_id, },
        });
    }

    getPermissions(queries: ({ tent_id: string; } | { category_id: string; } | { bonfire_id: string; }) & { non_self?: boolean }) {
        console.log(queries);
        return this.get<GetPermissionsOutput>({
            route: "gg.campground.permission.getPermissions",
            queries,
        });
    }

    updatePermission(queries: ({ tent_id: string; } | { category_id: string; } | { bonfire_id: string; }) & ({ role_id: string; } | { actor: string; }), body: Pick<CampsitePermissionView, "permissions">) {
        return this.post<CampsitePermissionView>({
            route: "gg.campground.permission.updatePermission",
            queries,
            body,
        });
    }
    
    getTentMessages(tent_id: string, offset: number = 0, limit: number = 50) {
        return this.get<GetTentMessagesOutput>({
            route: "gg.campground.tent.getMessages",
            queries: { tent_id, offset, limit, },
        });
    }
    
    createTentMessage(tent_id: string, body: { content: string; replies?: string[]; }) {
        return this.post<TentMessageViewBasic>({
            route: "gg.campground.tent.createMessage",
            queries: { tent_id, },
            body,
        });
    }
    
    updateTentMessage(tent_id: string, message_id: string, body: { content: string; }) {
        return this.post<TentMessageViewBasic>({
            route: "gg.campground.tent.updateMessage",
            queries: { tent_id, message_id, },
            body,
        });
    }

    deleteTentMessage(tent_id: string, message_id: string) {
        return this.post<TentMessageViewBasic>({
            route: "gg.campground.tent.deleteMessage",
            queries: { tent_id, message_id, },
        });
    }
}