import type { FormFieldId } from '#lib/Form/props.js';
import { getContext, setContext } from 'svelte';

/**
 * Defines the properties and functions required for a form field.
 */
export interface IFormField<T> {
	/**
	 * Used as a key in form's final value.
	 */
	id: FormFieldId;

	/**
	 * The current value of the form control.
	 */
	value: T;

	/**
	 * Whether the current form field is valid.
	 */
	valid: boolean;
	/**
	 * Whether the current form field's value has been changed.
	 */
	changed: boolean;

	/**
	 * Resets the field's value to default value.
	 */
	reset(): void;
}
/**
 * Defines the properties and functions required for a form field to use a control.
 */
export interface IFieldControl<T> {
	/**
	 * Unique identifier for the key used to give control's ID to labels.
	 */
	key: string;
	/**
	 * The current value of the form control.
	 */
	value: T;
	/**
	 * The default value provided to the form control.
	 */
	defaultValue: T;
	/**
	 * The current error that the control has.
	 * If the error is provided as an empty string, it means that the value of the control is empty in any possible way.
	 */
	error: string | null;

	/**
	 * Gets whether the value has to be changed and not be empty.
	 */
	required: boolean;
}
/**
 * Defines common control expected properties.
 */
export interface IFormControl<T> extends IFormField<T>, IFieldControl<T> {}
export class FieldControlInstance<T> implements IFormControl<T> {
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

	public reset(): void {
		this.value = this.defaultValue;
	}
}
export function setFieldControl<T = unknown>(value: IFieldControl<T>) {
	return setContext<IFieldControl<T>>(FieldControlInstance.contextKey, value);
}
export function getFieldControl<T = unknown>() {
	return getContext<IFieldControl<T>>(FieldControlInstance.contextKey);
}
