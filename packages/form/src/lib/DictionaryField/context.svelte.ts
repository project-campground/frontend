import { AbstractFormInstance } from '#lib/Form/context.svelte.js';
import type { FormFieldKey } from '#lib/Form/props.js';
import type { IFormControl, IFormField } from '#lib/FieldControl/context.svelte.js';
import type { DictionaryFieldValue } from './props.ts';

export class DictionaryFieldContext<T>
	extends AbstractFormInstance<IFormControl<unknown>>
	implements IFormField<unknown>
{
	public key: FormFieldKey;
	public required: boolean = $state(false);
	public disabled: boolean = $state(false);

	public value: T;
	public defaultValue: DictionaryFieldValue = {};

	constructor(
		public componentKey: string,
		private _submit: () => unknown,
		getInitialId: () => FormFieldKey,
		private _mapValue: () => (fields: IFormControl<unknown>[]) => T,
	) {
		super();
		this.key = $state(getInitialId());
		this.value = $derived(this._mapValue()(this.fields));
	}

	public submit() {
		return this._submit();
	}
}
