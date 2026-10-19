import { AbstractFormInstance } from '$lib/Form/context.svelte.js';
import type { FormFieldId } from '$lib/Form/props.js';
import type { IFormControl, IFormField } from '$lib/FormControl/context.svelte.js';
import type { FormObjectValue } from './props.ts';

export class FormObjectContext<T>
	extends AbstractFormInstance<IFormControl<unknown>>
	implements IFormField<unknown>
{
	public id: FormFieldId;
	public required: boolean = $state(false);
	public disabled: boolean = $state(false);

	public value: T;
	public defaultValue: FormObjectValue = {};

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
