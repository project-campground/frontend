import type { Snippet } from 'svelte';

export interface Span {
	from: number;
	to: number;
}

export interface CardProps {
	hide?: boolean;
	columns?: Span | number;
	rows?: Span | number;
}

export interface Item<T> {
	id: T;
}

export interface ItemProps<TId> {
	id: TId;
	children: Snippet;
}
export interface CellProps {
	cardProps?: CardProps;
	index: number;
	children: Snippet;
}

export interface ColumnProps<TItem extends Item<TId>, TId = TItem['id']> {
	prop: keyof TItem;
	header: string;
	disappearOn?: 'mobile' | 'tablet' | 'desktop-sm' | 'desktop-md';
	mobile?: CardProps;
	Component?: Snippet<[TItem]>;
}

interface EntryType {
	/**
	 * Nominative case of plural noun. This is the `default` case of any noun (e.g., `helmet`) as opposed to genitive (`helmet's`) and accusative (`him`).
	 */
	nominative: string;
	/**
	 * Accusative case of plural noun. It is not as apparent in English, but it exist in other languages, which is why separate locale message is needed for that.
	 * For native English speakers, this is equivalent to accusative `him` as opposed to nominative `he` and genitive `his`.
	 */
	accusative: string;
}

export interface RootProps<TItem extends Item<TId>, TId = TItem['id']> {
	columns: ColumnProps<TItem, TId>[];
	unselectable?: boolean;
	maxItems?: number;
	total?: number;

	entryType: EntryType;

	fetch: (count: number, skip: number, search: string) => Promise<TItem[]>;
}
