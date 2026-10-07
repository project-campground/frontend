import { AbstractFormInstance, type IFormInstance } from '$lib/Form/context.svelte.js';
import type { FormFieldId } from '$lib/Form/props.js';
import type { IFormControl } from '$lib/FormControl/context.svelte.js';

export type FormObjectValue = Record<FormFieldId, unknown>;

export class FormObjectContext
	extends AbstractFormInstance
	implements IFormInstance<unknown, IFormControl<unknown>>, IFormControl<FormObjectValue>
{
	public id: FormFieldId;
	public required: boolean = $state(false);
	public disabled: boolean = $state(false);

	public value = $derived(Object.fromEntries(this.controls.map((x) => [x.id, x.value])));

	public defaultValue: FormObjectValue = {};
	public error = $derived(this.controls.find((x) => x.error)?.error ?? null);

	constructor(
		public key: string,
		private _submit: () => unknown,
		getInitialId: () => FormFieldId,
	) {
		super();
		this.id = $state(getInitialId());
	}

	public submit() {
		return this._submit();
	}
}
