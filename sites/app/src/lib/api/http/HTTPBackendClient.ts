import HTTPBonfireManager from './bonfire.js';
import HTTPCampsiteManager from './campsite.js';
import HTTPCategoryManager from './category.js';
import type { RequestConfig } from './HTTPAtprotoClient.js';
import HTTPInviteManager from './invite.js';
import HTTPMemberManager from './member.js';
import HTTPMemberBanManager from './memberBan.js';
import HTTPMessageManager from './message.js';
import HTTPPermissionManager from './permission.js';
import HTTPProfilePostManager from './profilePost.js';
import HTTPRoleManager from './role.js';
import HTTPTentManager from './tent.js';
import type { Me } from '$lib/types/campground/me.js';
import HTTPProfileManager from './profile.js';
import type { Session } from '../session/Session.svelte.js';

export default class HTTPBackendClient {
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

	constructor(
		public session: Session,
		private _getBackendDomain: () => string,
	) {}

	public get domain(): string {
		return this._getBackendDomain();
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

	public get<T>(config: Omit<RequestConfig, 'method' | 'body'>) {
		return this.fetch<T>({ method: 'GET', ...config });
	}
	public post<T>(config: Omit<RequestConfig, 'method'>) {
		return this.fetch<T>({ method: 'POST', ...config });
	}

	public getUnauthed<T>(config: Omit<RequestConfig, 'method' | 'body'>) {
		return this.fetchUnauthed<T>({ method: 'GET', ...config });
	}
	public postAuthed<T>(config: Omit<RequestConfig, 'method'>) {
		return this.fetchUnauthed<T>({ method: 'POST', ...config });
	}

	public getMe() {
		return this.get<Me>({ route: `gg.campground.actor.getMe` });
	}

	public getServiceAuth(config: { exp?: number; lxm?: string }) {
		return this.atproto.getServiceAuth({ aud: this.domain.split('#', 1)[0], ...config });
	}

	public static getProxyFromDomain(backendDomain: string) {
		return `did:web:${backendDomain.replace(':', '%3A')}#campground_appview`;
	}
}
