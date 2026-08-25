import type HTTPBackendClient from '$lib/api/http/HTTPBackendClient.ts';
import type { Session } from '$lib/api/session/Session.svelte.js';
import type { AccountInfo } from '$lib/context/account.svelte.js';
import type { BonfireViewBasic } from '$lib/types/campground/bonfires.js';
import type { CampsiteViewDetailed } from '$lib/types/campground/campsites.js';
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

export class CampsiteContext {
	public campsite: CampsiteViewDetailed | null = $state(null);
	public tents: CampsiteTents | null = $state(null);
	private openBonfireId: string | null = $state(null);
	public domain: string | null = $state(null);

	constructor(
		private appview: HTTPBackendClient,
		private session: Session,
		private account: AccountInfo,
	) {}

	public get userIsOwner() {
		return this.campsite?.owner === this.campsite?.me.user.did;
	}

	public async init(domain: string, campsiteId: string) {
		this.campsite = await this.appview.campsites.get(campsiteId);
		this.domain = domain;
		// Since it comes unsorted
		this.campsite.bonfires = this.campsite.bonfires.sort((a, b) => a.position - b.position);

		if (this.openBonfireId) return await this.setTents(this.openBonfireId);
	}

	public async setOpenBonfire(bonfireId: string) {
		// No re-fetching
		if (this.openBonfireId === bonfireId) return;
		// Let it be dealt with when campsite is fetched
		else if (!this.campsite) return (this.openBonfireId = bonfireId);

		return this.setTents(bonfireId);
	}
	public async setTents(bonfireId: string) {
		const tents = await this.appview.tents.getMany(this.campsite!.id, bonfireId);
		this.tents = new CampsiteTents(this, bonfireId, tents);
	}
}
export class CampsiteTents {
	public static ownerPermissionsAggregated: AggregatedPermissions = {
		role: maxPermissions,
		bonfire: maxPermissions,
		categories: {},
		tents: {},
	};
	private _tentToPermissions: Record<string, PermissionsDictionary> = {};
	private aggregatedPermissions: AggregatedPermissions = CampsiteTents.ownerPermissionsAggregated;

	constructor(
		public campsiteContext: CampsiteContext,
		public bonfireId: string,
		public tentOutput: GetTentsOutput,
	) {
		if (!this.campsiteContext.campsite || this.campsiteContext.userIsOwner) return;

		this.aggregatedPermissions = aggregateAllPermissions(
			this.campsiteContext.campsite.me,
			this.campsiteContext.campsite.roles,
			this.tentOutput.permissions,
		);
	}

	// Content of tent list
	public get campsite(): CampsiteViewDetailed {
		return this.campsiteContext.campsite!;
	}
	public get bonfire(): BonfireViewBasic {
		return this.campsiteContext.campsite!.bonfires.find((x) => x.id === this.bonfireId)!;
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
		if (this.campsiteContext.userIsOwner) return maxPermissions;
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
