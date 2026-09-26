import WSClient from '$lib/api/ws/WSClient.js';
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

export class CampsiteReference {
	public campsite: CampsiteViewDetailed;

	constructor(
		public domain: string,
		campsite: CampsiteViewDetailed,
		public webSocket: WSClient,
	) {
		this.campsite = $state(campsite);
	}

	public get userIsOwner() {
		return this.campsite?.owner === this.campsite?.me.user.did;
	}
}

export class CampsiteContext {
	public campsiteReference: CampsiteReference | null = $state(null);
	public openBonfire: BonfireContext | null = $state(null);

	public campsite = $derived(this.campsiteReference?.campsite);
	public bonfires = $derived(this.campsite?.bonfires);
	public roles = $derived(this.campsite?.roles);
	public userIsOwner = $derived(this.campsite?.owner === this.campsite?.me.user.did);

	constructor(public setActiveBonfire: (id: string) => unknown) {}

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
	public tentToPermissions: Record<string, PermissionsDictionary> = {};
	private aggregatedPermissions: AggregatedPermissions = BonfireContext.ownerPermissionsAggregated;
	public tentOutput: GetTentsOutput;

	constructor(
		public bonfireId: string,
		public campsiteReference: CampsiteReference,
		tentOutput: GetTentsOutput,
	) {
		this.tentOutput = $state(tentOutput);

		tentOutput.categories.sort((a, b) => a.position - b.position);

		if (!this.campsiteReference.campsite || this.campsiteReference.userIsOwner) return;

		this.aggregatedPermissions = aggregateAllPermissions(
			this.campsiteReference.campsite.me,
			this.campsiteReference.campsite.roles,
			this.tentOutput.permissions,
		);
	}

	/**
	 * The campsite of the bonfire.
	 */
	public get campsite(): CampsiteViewDetailed {
		return this.campsiteReference.campsite!;
	}
	/**
	 * The bonfire as given by the API.
	 */
	public get bonfire(): BonfireViewBasic {
		return this.campsiteReference.campsite!.bonfires.find((x) => x.id === this.bonfireId)!;
	}
	/**
	 * Whether the bonfire is the bonfire that contains bulletin board and is displayed when viewing the campsite for the first time.
	 */
	public get isBonfireDefault(): boolean {
		return this.campsite.bonfires[0].id === this.bonfire.id;
	}
	/**
	 * The list of categories within the bonfire only.
	 */
	public get categories(): TentCategoryView[] {
		return this.tentOutput.categories;
	}
	/**
	 * Updates the list of categories within the bonfire only.
	 */
	public set categories(value: TentCategoryView[]) {
		this.tentOutput.categories = value;
	}
	/**
	 * The list of tents within bonfire only.
	 */
	public get tents(): TentViewBasic[] {
		return this.tentOutput.tents;
	}
	/**
	 * Updates the list of tents within the bonfire only.
	 */
	public set tents(value: TentViewBasic[]) {
		this.tentOutput.tents = value;
	}
	/**
	 * The list of all tent, category and bonfire permissions within this bonfire.
	 */
	public get permissions(): CampsitePermissionViewBasic[] {
		return this.tentOutput.permissions;
	}

	/**
	 * The list of permissions for all categories within this bonfire for this user.
	 */
	public get categoryPermissions(): Record<string, PermissionsDictionary> {
		return this.aggregatedPermissions.categories;
	}
	/**
	 * The list of permissions for this user in this bonfire.
	 */
	public get bonfirePermissions(): PermissionsDictionary {
		return this.aggregatedPermissions.bonfire;
	}
	/**
	 * The list of permission for this user in this bonfire.
	 */
	public get rolePermissions(): PermissionsDictionary {
		return this.aggregatedPermissions.role;
	}
	/**
	 * Gets from cache or calculates the permissions of tent when it is in the given category. When category is not specified, it is calculated based on parent bonfire's permissions.
	 * @param tentId The ID of the tent
	 * @param categoryId The ID of the tent's parent category
	 * @returns Tent's permissions
	 */
	public getTentPermission(tentId: string, categoryId?: string | null): PermissionsDictionary {
		// No need to calculate it; they have all perms
		if (this.campsiteReference.userIsOwner) return maxPermissions;
		// Possibly already cached
		else if (this.tentToPermissions[tentId]) return this.tentToPermissions[tentId];

		return this.recacheTentPermissions(tentId, categoryId);
	}
	/**
	 * Calculates and changes the cached value of the tent's permissions. Useful in WS events.
	 * @param tentId The ID of the tent
	 * @param categoryId The ID of the tent's parent category
	 * @returns Tent's calculated permissions
	 */
	public recacheTentPermissions(tentId: string, categoryId?: string | null) {
		const categoryPerms =
			categoryId && this.categoryPermissions[categoryId] ?
				this.categoryPermissions[categoryId]
			:	this.bonfirePermissions;

		const tentOverwrittenPerms: PermissionsStateDictionary | undefined =
			this.aggregatedPermissions.tents[tentId];

		// Nothing to calculate anyways
		if (!tentOverwrittenPerms) return categoryPerms;

		// Category perms < Tent's denied perms < Tent's allowed perms
		return ((this.tentToPermissions[tentId] as PermissionsDictionary) = {
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
