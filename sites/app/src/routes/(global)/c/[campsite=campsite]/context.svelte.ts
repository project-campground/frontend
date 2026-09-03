import type HTTPAtprotoClient from '$lib/api/http/HTTPAtprotoClient.ts';
import type HTTPBackendClient from '$lib/api/http/HTTPBackendClient.ts';
import type { Session } from '$lib/api/session/Session.svelte.js';
import WSClient from '$lib/api/ws/WSClient.js';
import type { AccountInfo } from '$lib/context/account.svelte.js';
import type { BonfireViewBasic } from '$lib/types/campground/bonfires.js';
import type {
	CampsiteViewDetailed,
	CampsiteViewWithDomain,
} from '$lib/types/campground/campsites.js';
import type {
	CampsitePermissionViewBasic,
	PermissionsDictionary,
	PermissionsStateDictionary,
} from '$lib/types/campground/permissions.js';
import type {
	GetTentsOutput,
	TentCategoryView,
	TentViewBasic,
} from '$lib/types/campground/tent.js';
import {
	aggregateAllPermissions,
	invertContentPermission,
	invertGeneralPermission,
	maxPermissions,
	type AggregatedPermissions,
} from '$lib/util/permissions.js';
import { createContext } from 'svelte';

export class CampsiteReference {
	constructor(
		public domain: string,
		public campsite: CampsiteViewDetailed,
		public webSocket: WSClient,
	) {}

	public get userIsOwner() {
		return this.campsite?.owner === this.campsite?.me.user.did;
	}
}

export class CampsiteContext {
	public campsiteReference: CampsiteReference | null = $state(null);
	public openBonfire: BonfireContext | null = $state(null);

	constructor(public setActiveBonfire: (id: string) => unknown) {}

	public get campsite() {
		return this.campsiteReference?.campsite;
	}
	public get bonfires() {
		return this.campsiteReference?.campsite.bonfires;
	}
	public get userIsOwner() {
		return this.campsiteReference?.campsite.owner === this.campsiteReference?.campsite.me.user.did;
	}
	public get roles() {
		return this.campsiteReference?.campsite.roles;
	}
	public get webSocket() {
		return this.campsiteReference?.webSocket;
	}
	public get domain() {
		return this.campsiteReference?.domain;
	}
}
export class BonfireContext {
	public static ownerPermissionsAggregated: AggregatedPermissions = {
		role: maxPermissions,
		bonfire: maxPermissions,
		categories: {},
		tents: {},
	};
	private _tentToPermissions: Record<string, PermissionsDictionary> = {};
	private aggregatedPermissions: AggregatedPermissions = BonfireContext.ownerPermissionsAggregated;

	constructor(
		public bonfireId: string,
		public campsiteReference: CampsiteReference,
		public tentOutput: GetTentsOutput,
	) {
		if (!this.campsiteReference.campsite || this.campsiteReference.userIsOwner) return;

		tentOutput.categories.sort((a, b) => a.position - b.position);

		this.aggregatedPermissions = aggregateAllPermissions(
			this.campsiteReference.campsite.me,
			this.campsiteReference.campsite.roles,
			this.tentOutput.permissions,
		);
	}

	// Content of tent list
	public get campsite(): CampsiteViewDetailed {
		return this.campsiteReference.campsite!;
	}
	public get bonfire(): BonfireViewBasic {
		return this.campsiteReference.campsite!.bonfires.find((x) => x.id === this.bonfireId)!;
	}
	public get isBonfireDefault(): boolean {
		return this.campsite.bonfires[0].id === this.bonfire.id;
	}
	public get categories(): TentCategoryView[] {
		return this.tentOutput.categories;
	}
	public get tents(): TentViewBasic[] {
		return this.tentOutput.tents;
	}
	public get permissions(): CampsitePermissionViewBasic[] {
		return this.tentOutput.permissions;
	}

	public get categoryPermissions(): Record<string, PermissionsDictionary> {
		return this.aggregatedPermissions.categories;
	}
	public get bonfirePermissions(): PermissionsDictionary {
		return this.aggregatedPermissions.bonfire;
	}
	public get rolePermissions(): PermissionsDictionary {
		return this.aggregatedPermissions.role;
	}
	public getTentPermission(tentId: string, categoryId?: string | null): PermissionsDictionary {
		// No need to calculate it; they have all perms
		if (this.campsiteReference.userIsOwner) return maxPermissions;
		// Possibly already cached
		else if (this._tentToPermissions[tentId]) return this._tentToPermissions[tentId];

		const categoryPerms =
			categoryId && this.categoryPermissions[categoryId] ?
				this.categoryPermissions[categoryId]
			:	this.bonfirePermissions;

		const tentOverwrittenPerms: PermissionsStateDictionary | undefined =
			this.aggregatedPermissions.tents[tentId];

		// Nothing to calculate anyways
		if (!tentOverwrittenPerms) return categoryPerms;

		// Category perms < Tent's denied perms < Tent's allowed perms
		return ((this._tentToPermissions[tentId] as PermissionsDictionary) = {
			general:
				(categoryPerms.general & invertGeneralPermission(tentOverwrittenPerms.denied.general))
				| tentOverwrittenPerms.allowed.general,
			content:
				(categoryPerms.content & invertContentPermission(tentOverwrittenPerms.denied.content))
				| tentOverwrittenPerms.allowed.content,
		});
	}
}

export const [getCampsiteContext, setCampsiteContext] = createContext<CampsiteContext>();
