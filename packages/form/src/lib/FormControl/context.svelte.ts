import type { FormFieldId } from '$lib/Form/props.js';
import { createContext } from 'svelte';

export class FormControlInstance<T> {
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

	public reset() {
		return (this.value = this.defaultValue);
	}
}
export const [getFormControl, setFormControl] = createContext<FormControlInstance<any>>();
