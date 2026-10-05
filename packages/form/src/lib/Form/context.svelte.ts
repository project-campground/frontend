import { createContext } from 'svelte';
import type { FormControlInstance } from '$lib/FormControl/context.svelte.js';
import type { FormFieldId } from './props.ts';

export class FormInstance {
	public controls: FormControlInstance<any>[] = $state([]);

	public values: Record<FormFieldId, string | null> = $derived(
		FormInstance.mapInstance(this.controls, (x) => [x.id, x.value]),
	);
	public valid: Record<FormFieldId, boolean> = $derived(
		FormInstance.mapInstance(this.controls, (x) => [x.id, x.valid]),
	);
	public error: Record<FormFieldId, string | null> = $derived(
		FormInstance.mapInstance(this.controls, (x) => [x.id, x.error]),
	);
	public changed: boolean = $derived(this.controls.some((x) => x.changed));

	constructor(
		private _submit: () =>
			| undefined
			| ((
					values: Record<FormFieldId, any>,
					ev?: MouseEvent | undefined,
			  ) => Promise<unknown> | unknown),
	) {}

	public submit(ev?: MouseEvent | undefined) {
		return this._submit()?.(this.values, ev);
	}
	public reset() {
		return this.controls.map((x) => x.reset());
	}
	public getControl(id: FormFieldId): FormControlInstance<any> | null {
		return this.controls.find((x) => x.id === id) ?? null;
	}

	private static mapInstance<T>(
		controls: FormControlInstance<unknown>[],
		fn: (instance: FormControlInstance<any>) => [FormFieldId, T],
	) {
		return Object.fromEntries(controls.map(fn));
	}
}

export const [getForm, setForm] = createContext<FormInstance>();
