import type { FormInstance } from '@campground/form';
import { getContext, setContext } from 'svelte';

export class SettingsContext<TPage extends string> {
	public static contextKey = {};
	public page: TPage;
	public form: FormInstance | null = $state(null);
	public hasChanged: boolean = $derived(this.form?.changed ?? false);
	public defaults: any[] | undefined = $derived(this.form?.controls.map((x) => x.defaultValue));

	constructor(defaultPage: () => TPage) {
		this.page = $state(defaultPage());
	}

	public setForm(instance: FormInstance | null) {
		this.form = instance;
	}

	public reset = () => this.form?.controls.map((x) => x.reset());
	public save = (ev?: MouseEvent) => ((this.hasChanged = false), this.form?.submit(ev));

	public openPage(page: TPage) {
		this.page = page;
		this.form = null;
	}
}

export function getSettings<TPage extends string>() {
	return getContext<SettingsContext<TPage>>(SettingsContext.contextKey);
}
export function setSettings<TPage extends string>(value: SettingsContext<TPage>) {
	return setContext<SettingsContext<TPage>>(SettingsContext.contextKey, value);
}
