import { getContext, setContext } from 'svelte';

export class ItemListSettingsContext<T> {
	public static contextKey = {};

	public selected: T;
	constructor(defaultSelected: T) {
		this.selected = $state(defaultSelected);
	}
}

export function getItemListSettings<T>() {
	return getContext<ItemListSettingsContext<T>>(ItemListSettingsContext.contextKey);
}
export function setItemListSettings(value: ItemListSettingsContext<unknown>) {
	return setContext(ItemListSettingsContext.contextKey, value);
}
