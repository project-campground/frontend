import type HTTPBackendClient from '#lib/api/http/HTTPBackendClient.ts';
import type { BonfireViewInList } from '#lib/types/campground/bonfires.js';
import type {
	GetTentsOutput,
	TentCategoryViewInList,
	TentViewInList,
} from '#lib/types/campground/tent.js';
import { aggregatePermissions, applyNestedPermissions } from '#lib/util/permissions.js';
import type { CampsiteContext } from './context.svelte.ts';

export class BonfireContext {
	public tents: TentViewInList[];
	public categories: TentCategoryViewInList[];
	/**
	 *
	 */
	public bonfire: BonfireViewInList;
	/**
	 * The bonfire permissions.
	 */
	public permissions: bigint;

	constructor(
		public id: string,
		public campsiteContext: CampsiteContext,
		private _output: GetTentsOutput,
	) {
		this._output.categories.sort((a, b) => a.position - b.position);

		this.tents = $state(this._output.tents);
		this.categories = $state(this._output.categories);
		this.bonfire = $derived(this.campsiteContext.bonfires.find((x) => x.id === this.id)!);
		this.permissions = $derived(
			applyNestedPermissions(
				this.campsiteContext.permissions,
				aggregatePermissions(this.bonfire.permissions),
			),
		);
	}

	public categoryPermission(id: string) {
		const category = this.categories.find((x) => x.id === id);

		if (!category) return 0n;

		return applyNestedPermissions(this.permissions, aggregatePermissions(category.permissions));
	}

	public static async initialize(
		campsiteId: string,
		bonfireId: string,
		campsiteContext: CampsiteContext,
		appview: HTTPBackendClient,
	) {
		const tents = await appview.tents.getMany(campsiteId, bonfireId);
		return new BonfireContext(bonfireId, campsiteContext, tents);
	}
}
