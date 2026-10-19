import type { FormInstance } from '@campground/form';
import { getContext, setContext } from 'svelte';

export class SettingsContext<TPage extends string, TValue> {
	public static contextKey = {};
	public page: TPage;
	public form: FormInstance | null = $state(null);
	public hasChanged: boolean = $derived(this.form?.changed ?? false);
	public value: TValue;

	constructor(defaultPage: () => TPage, defaultValue: TValue) {
		this.page = $state(defaultPage());
		this.value = $state(defaultValue);
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

export function getSettings<TValue = null, TPage extends string = string>() {
	return getContext<SettingsContext<TPage, TValue>>(SettingsContext.contextKey);
}
export function setSettings<TPage extends string, TValue = null>(
	value: SettingsContext<TPage, TValue>,
) {
	return setContext<SettingsContext<TPage, TValue>>(SettingsContext.contextKey, value);
}
