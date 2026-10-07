import type { FormFieldId } from '$lib/Form/props.js';
import { getContext, setContext } from 'svelte';

/**
 * Defines common things
 */
export interface IFormControl<T> {
	key: string;

	id: FormFieldId;

	value: T;
	defaultValue: T;
	error: string | null;

	required: boolean;

	valid: boolean;
	changed: boolean;

	reset(): void;
}
export class FormControlInstance<T> implements IFormControl<T> {
	public static contextKey = {};
	public error: string | null = $state(null);
	public value: T;
	public defaultValue: T;
	public id: FormFieldId;
	public required: boolean = $state(false);
	public disabled: boolean = $state(false);
	public valid: boolean = $derived(this.error === null || this.disabled);
	public changed: boolean;

	constructor(
		public key: string,
		getDefaultValue: () => T,
		getId: () => FormFieldId,
	) {
		const defaultValue = getDefaultValue();
		this.value = $state(defaultValue);
		this.id = $state(getId());
		this.defaultValue = defaultValue;
		this.changed = $derived(
			typeof this.defaultValue === 'object' ?
				JSON.stringify(this.value) !== JSON.stringify(this.defaultValue)
			:	this.value !== this.defaultValue,
		);
	}

	public reset() {
		this.value = this.defaultValue;
	}
}
export function setFormControl<T = unknown>(value: IFormControl<T>) {
	return setContext<IFormControl<T>>(FormControlInstance.contextKey, value);
}
export function getFormControl<T = unknown>() {
	return getContext<IFormControl<T>>(FormControlInstance.contextKey);
}
