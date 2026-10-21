import { AbstractFormInstance } from '#lib/Form/context.svelte.js';
import type { FormFieldId } from '#lib/Form/props.js';
import type { IFormControl, IFormField } from '#lib/FieldControl/context.svelte.ts';
import type { DictionaryFieldValue } from './props.ts';

export class DictionaryFieldContext<T>
	extends AbstractFormInstance<IFormControl<unknown>>
	implements IFormField<unknown>
{
	public id: FormFieldId;
	public required: boolean = $state(false);
	public disabled: boolean = $state(false);

	public value: T;
	public defaultValue: DictionaryFieldValue = {};

	constructor(
		public key: string,
		private _submit: () => unknown,
		getInitialId: () => FormFieldId,
		private _mapValue: () => (fields: IFormControl<unknown>[]) => T,
	) {
		super();
		this.id = $state(getInitialId());
		this.value = $derived(this._mapValue()(this.fields));
	}

	public submit() {
		return this._submit();
	}
}
