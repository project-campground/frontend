import type { FormFieldId } from '#lib/Form/props.js';
import type { IFormControl, IFormField } from '#lib/FieldControl/context.svelte.js';
import { getContext, setContext } from 'svelte';
import type { Readable } from 'svelte/store';

export class ArrayFieldItem<T> implements IFormControl<T> {
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
export class ArrayFieldContext<T> implements IFormField<T[]> {
	public static contextKey = {};

	public controls: ArrayFieldItem<T>[] = $state([]);

	public id: FormFieldId;

	public valid = $derived(this.controls.every((x) => x.valid));
	public value = $derived(this.controls.map((x) => x.value));

	public defaultValue: T[];
	public defaultItemValue: T;
	public changed: boolean;

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
		this.controls = ArrayFieldContext.createItemsFromDefaultValue(this.defaultValue);
	}

	public static createItemsFromDefaultValue<T>(value: T[]) {
		return value.map(
			(defaultValue, i) => new ArrayFieldItem<T>((Date.now() + i).toString(), defaultValue),
		);
	}

	public addItem() {
		this.controls.push(new ArrayFieldItem<T>(Date.now().toString(), this.defaultItemValue));
	}
	public removeItem(key: string) {
		const index = this.controls.findIndex((x) => x.key === key);

		if (index < 0) return;

		return this.controls.splice(index, 1);
	}
}

export function getArrayField<T>() {
	return getContext<ArrayFieldContext<T>>(ArrayFieldContext.contextKey);
}
export function setArrayField<T>(value: ArrayFieldContext<T>) {
	return setContext<ArrayFieldContext<T>>(ArrayFieldContext.contextKey, value);
}
