import HTTPBonfireManager from "./bonfire";
import HTTPCampsiteManager from "./campsite";
import HTTPCategoryManager from "./category";
import type { RequestConfig } from "./HTTPAtprotoClient";
import HTTPInviteManager from "./invite";
import HTTPMemberManager from "./member";
import HTTPMemberBanManager from "./memberBan";
import HTTPMessageManager from "./message";
import HTTPPermissionManager from "./permission";
import HTTPProfilePostManager from "./profilePost";
import HTTPRoleManager from "./role";
import HTTPTentManager from "./tent";
import type { Me } from "types/campground/me";
import type { Session } from "~/context/session/types";
import HTTPProfileManager from "./profile";

export default class HTTPBackendClient {
    public domain: string;
    public session: Session;

    public profiles = new HTTPProfileManager(this);
    public profilePosts = new HTTPProfilePostManager(this);

    public campsites = new HTTPCampsiteManager(this);

    public members = new HTTPMemberManager(this);
    public roles = new HTTPRoleManager(this);
    public memberBans = new HTTPMemberBanManager(this);
    public invites = new HTTPInviteManager(this);

    public bonfires = new HTTPBonfireManager(this);
    public categories = new HTTPCategoryManager(this);
    public tents = new HTTPTentManager(this);

    public permissions = new HTTPPermissionManager(this);
    public messages = new HTTPMessageManager(this);

    constructor(session: Session, backendDomain: string) {
        this.session = session;
        this.domain = backendDomain;
    }

    public get atproto() {
        return this.session.atproto;
    }
    
    public get actorDid() {
        return this.atproto.actorDid;
    }
    
    public async fetchUnauthed<T>(request: RequestConfig) {
        return this.atproto.fetchProxiedUnauthed<T>(this.domain, request);
    }
    
    public async fetch<T>(request: RequestConfig) {
        return this.atproto.fetchProxied<T>(this.domain, request);
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
    public postAuthed<T>(config: Omit<RequestConfig, "method">) {
        return this.fetchUnauthed<T>({ method: "POST", ...config });
    }
    
    public getMe() {
        return this.get<Me>({
            route: `gg.campground.actor.getMe`,
        });
    }
    
    public getServiceAuth(config: { exp?: number; lxm?: string }) {
        return this.atproto.getServiceAuth({
            aud: this.domain.split("#", 1)[0],
            ...config,
        })
    }
    
    public static getProxyFromDomain(backendDomain: string) {
        return `did:web:${backendDomain.replace(":", "%3A")}#campground_appview`;
    }
}