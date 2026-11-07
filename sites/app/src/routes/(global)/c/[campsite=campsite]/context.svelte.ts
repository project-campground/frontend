import WSClient from '#lib/api/ws/WSClient.js';
import type { CampsiteViewDetailed } from '#lib/types/campground/campsites.js';
import { PermissionMax, RoleFlag } from '#lib/util/constants.js';
import { getContext, hasContext, setContext } from 'svelte';
import type { BonfireContext } from './bonfires.svelte.ts';
import type HTTPBackendClient from '#lib/api/http/HTTPBackendClient.ts';
import type { AuthContext } from '#lib/context/auth/context.svelte.js';
import { filter, type Unsubscribable } from 'rxjs';
import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';

export class CampsiteReference {
	public campsite: CampsiteViewDetailed;
	public bonfires: BonfireViewInList[];

	constructor(
		public domain: string,
		campsite: CampsiteViewDetailed,
		bonfires: BonfireViewInList[],
		public webSocket: WSClient,
		private _webSocketSubscription: Unsubscribable,
	) {
		this.campsite = $state(campsite);
		this.bonfires = $state(bonfires);
	}

	public static sortCampsiteItems(campsite: CampsiteViewDetailed) {
		campsite.roles.sort((a, b) => a.position - b.position);
	}

	public dispose() {
		return this._webSocketSubscription.unsubscribe();
	}

	public static async initialize(
		session: AuthContext,
		appview: HTTPBackendClient,
		domain: string,
		campsiteId: string,
	) {
		const [campsite, bonfires] = await Promise.all([
			appview.campsites.get(campsiteId),
			appview.bonfires.getMany(campsiteId),
		]);
		// Do one-time deal to not sort in every place ever
		CampsiteReference.sortCampsiteItems(campsite);

		const webSocket = new WSClient({
			httpClient: session.atproto,
			url: `${domain?.split(':')[0] === 'localhost' ? 'http' : 'https'}://${domain}/ws/v1`,
		});

		const webSocketUnsubscribe = webSocket?.messages
			.pipe(filter((value) => value.op === 0 && value.t === 'open'))
			.subscribe(() => webSocket.setCampsite(campsiteId));

		return new CampsiteReference(domain, campsite, bonfires, webSocket, webSocketUnsubscribe);
	}
}

export class CampsiteContext {
	public static contextKey = {};

	public campsiteReference: CampsiteReference | null = $state(null);
	public campsite = $derived(this.campsiteReference?.campsite);
	public roles = $derived(this.campsite?.roles);
	public defaultRole = $derived(
		this.roles?.find((x) => (x.flags & RoleFlag.Default) === RoleFlag.Default),
	);

	public me = $derived(this.campsite?.me);
	public userIsOwner = $derived(this.campsite?.owner === this.campsite?.me.user.did);
	/**
	 * Shortens the permission checking by giving max permission or null depending on whether user is the owner of the campsite.
	 */
	public ownerPermissions = $derived(this.userIsOwner ? PermissionMax : null);
	/**
	 * Gets the permissions of this user in this campsite.
	 */
	public permissions = $derived(
		this.ownerPermissions
			?? this.roles
				?.filter((x) => this.me?.roles.includes(x.id))
				.reduce((initial, role) => initial | role.permissions, 0n)
			?? PermissionMax,
	);

	public bonfires = $derived(this.campsiteReference?.bonfires ?? []);
	public homeBonfire = $derived(this.bonfires.find((x) => x.home));
	public openBonfire: BonfireContext | null = $state(null);

	constructor(public setActiveBonfire: (id: string) => unknown) {}

	public get webSocket() {
		return this.campsiteReference?.webSocket;
	}
	public get domain() {
		return this.campsiteReference?.domain;
	}
}

export function getCampsiteContext() {
	return getContext<CampsiteContext>(CampsiteContext.contextKey);
}
export function hasCampsiteContext() {
	return hasContext(CampsiteContext.contextKey);
}
export function setCampsiteContext(campsiteContext: CampsiteContext) {
	return setContext<CampsiteContext>(CampsiteContext.contextKey, campsiteContext);
}
