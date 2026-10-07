import type { FormFieldId } from '$lib/Form/props.js';
import type { IFormControl } from '$lib/FormControl/context.svelte.js';
import { getContext, setContext } from 'svelte';
import type { Readable } from 'svelte/store';

export class FormArrayItem<T> implements IFormControl<T> {
	public id: FormFieldId;
	public value: T;
	public error: string | null = $state(null);
	public required = true;
	public valid: boolean = $derived(this.error === null);
	public changed: boolean;
	constructor(
		public key: string,
		public defaultValue: T,
	) {
		this.id = this.key;
		this.value = $state(defaultValue);
		this.changed = $derived(this.value !== this.defaultValue);
	}

	public reset() {
		this.value = this.defaultValue;
	}
}
export class FormArrayContext<T> implements IFormControl<T[]> {
	public static contextKey = {};

	public controls: FormArrayItem<T>[] = $state([]);

	public id: FormFieldId;
	public required: boolean = $state(false);
	public disabled: boolean = $state(false);

	public valid = $derived(this.controls.every((x) => x.valid));
	public value = $derived(this.controls.map((x) => x.value));

	public defaultValue: T[];
	public defaultItemValue: T;
	public changed: boolean;
	public error = $derived(this.controls.find((x) => x.error)?.error ?? null);

	constructor(
		public key: string,
		getDefaultValue: () => T[],
		getDefaultItemValue: () => T,
		getInitialId: () => FormFieldId,
		public max: Readable<number | undefined | null>,
	) {
		this.id = $state(getInitialId());
		this.defaultValue = $state(getDefaultValue());
		this.defaultItemValue = $state(getDefaultItemValue());
		this.changed = $derived(
			this.controls.length !== this.defaultValue.length || this.controls.some((x) => x.changed),
		);
	}

	public reset() {
		this.controls = FormArrayContext.createItemsFromDefaultValue(this.defaultValue);
	}

	public static createItemsFromDefaultValue<T>(value: T[]) {
		return value.map(
			(defaultValue, i) => new FormArrayItem<T>((Date.now() + i).toString(), defaultValue),
		);
	}

	public addItem() {
		this.controls.push(new FormArrayItem<T>(Date.now().toString(), this.defaultItemValue));
	}
	public removeItem(key: string) {
		const index = this.controls.findIndex((x) => x.key === key);

		if (index < 0) return;

		return this.controls.splice(index, 1);
	}
}

export function getFormArray<T>() {
	return getContext<FormArrayContext<T>>(FormArrayContext.contextKey);
}
export function setFormArray<T>(value: FormArrayContext<T>) {
	return setContext<FormArrayContext<T>>(FormArrayContext.contextKey, value);
}
