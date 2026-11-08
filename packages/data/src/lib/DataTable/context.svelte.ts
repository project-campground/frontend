import { getContext, setContext } from 'svelte';
import type { Item } from './props.ts';

export enum DataTableState {
	Loaded = 0,
	Loading = 1,
}

export class DataTableContext<TItem extends Item<TId>, TId> {
	public static contextKey = {};

	public selected: TId[] = $state([]);
	public items: TItem[] = $state([]);
	public fetchCount: number = $state(0);
	public state: DataTableState = $state(DataTableState.Loading);

	constructor(
		private fetchItems: () => (count: number, offset: number, search: string) => Promise<TItem[]>,
	) {}

	public async fetch(page: number, search: string) {
		this.state = DataTableState.Loading;
		this.selected = [];

		const items = await this.fetchItems()(this.fetchCount, page * this.fetchCount, search);

		this.items = items;
		this.state = DataTableState.Loaded;
	}

	public selectAll() {
		this.selected = this.items.map((x) => x.id);
	}
	public deselectAll() {
		this.selected = [];
	}

	public addSelected(id: TId) {
		this.selected.push(id);
	}
	public removeSelected(id: TId) {
		this.selected = this.selected.filter((x) => x !== id);
	}
}
// For generic getContext
export function getDataTable<TItem extends Item<TId>, TId>() {
	return getContext<DataTableContext<TItem, TId>>(DataTableContext.contextKey);
}
export function setDataTable<TItem extends Item<TId>, TId>(context: DataTableContext<TItem, TId>) {
	return setContext(DataTableContext.contextKey, context);
}
