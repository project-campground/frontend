import { getContext, setContext } from 'svelte';

export class SettingsContext<TPage extends string> {
	public static contextKey = {};
	public page: TPage;

	constructor(defaultPage: () => TPage) {
		this.page = $state(defaultPage());
	}

	public openPage(page: TPage) {
		this.page = page;
	}
}

export function getSettings<TPage extends string>() {
	return getContext<SettingsContext<TPage>>(SettingsContext.contextKey);
}
export function setSettings<TPage extends string>(value: SettingsContext<TPage>) {
	return setContext<SettingsContext<TPage>>(SettingsContext.contextKey, value);
}
