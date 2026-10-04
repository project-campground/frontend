import type { FormFieldId } from '$lib/Form/props.js';
import { getContext, setContext } from 'svelte';

export class FormControlInstance<T> {
	public static contextKey = {};
	public error: string | null = $state(null);
	public value: T;

	constructor(
		public key: string,
		private getDefaultValue: () => T,
		private getId: () => FormFieldId,
		private getRequired: () => boolean,
		private getDisabled: () => boolean,
	) {
		this.value = $state(getDefaultValue());
	}

	public get id() {
		return this.getId();
	}
	public get required() {
		return this.getRequired();
	}
	public get disabled() {
		return this.getDisabled();
	}
	public get defaultValue() {
		return this.getDefaultValue();
	}
	public get valid() {
		return this.error === null || this.disabled;
	}
	public get changed() {
		return this.value !== this.defaultValue;
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
