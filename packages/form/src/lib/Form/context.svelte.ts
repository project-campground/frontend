import { createContext } from 'svelte';
import type { FormControlInstance } from '$lib/FormControl/context.svelte.js';
import type { FormFieldId } from './props.ts';

export class FormInstance {
	public controls: FormControlInstance<any>[] = $state([]);

	constructor(private _submit: () => (undefined | ((values: Record<FormFieldId, any>, ev?: MouseEvent | undefined) => Promise<unknown>))) {
	}

	public get valid(): Record<FormFieldId, boolean> {
		return this._mapInstance((x) => [x.id, x.valid]);
	}
	public get error(): Record<FormFieldId, string | null> {
		return this._mapInstance((x) => [x.id, x.error]);
	}
	public get values(): Record<FormFieldId, string | null> {
		return this._mapInstance((x) => [x.id, x.value]);
	}

	public get submit() {
		return this._submit();
	}
	public getControl(id: FormFieldId): FormControlInstance<any> | null {
		return this.controls.find((x) => x.id === id) ?? null;
	}

	private _mapInstance<T>(fn: (instance: FormControlInstance<any>) => [FormFieldId, T]) {
		return Object.fromEntries(this.controls.map(fn));
	}
}

export const [getForm, setForm] = createContext<FormInstance>();
