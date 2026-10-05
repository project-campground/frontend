import type { FormFieldId } from '$lib/Form/props.js';
import { getContext, setContext } from 'svelte';

export class FormControlInstance<T> {
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
		this.id = getId();
		this.defaultValue = defaultValue;
		this.changed = $derived(
			(console.log('Changed fetched', this.id),
			typeof this.defaultValue === 'object' ?
				JSON.stringify(this.value) !== JSON.stringify(this.defaultValue)
			:	this.value !== this.defaultValue),
		);
	}

	public reset() {
		return (this.value = this.defaultValue);
	}
}
export function setFormControl<T = unknown>(value: FormControlInstance<T>) {
	return setContext<FormControlInstance<T>>(FormControlInstance.contextKey, value);
}
export function getFormControl<T = unknown>() {
	return getContext<FormControlInstance<T>>(FormControlInstance.contextKey);
}
