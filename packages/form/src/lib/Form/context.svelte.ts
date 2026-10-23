import { getContext, setContext } from 'svelte';
import type { IFormField } from '#lib/FieldControl/context.svelte.ts';
import type { FormFieldKey } from './props.ts';

export interface IFormInstance<TValue, TField extends IFormField<TValue>> {
	changed: boolean;
	valid: boolean;
	fields: TField[];

	addFieldToForm(instance: TField): () => void;
	submit(ev?: MouseEvent): void;
	reset(): void;
}
export abstract class AbstractFormInstance<T extends IFormField<unknown>> implements IFormInstance<
	unknown,
	T
> {
	public fields: T[] = $state([]);

	public valid: boolean = $derived(this.fields.every((x) => x.valid));
	public changed: boolean = $derived(this.fields.some((x) => x.changed));

	public abstract submit(): void;

	public reset() {
		return this.fields.map((x) => x.reset());
	}

	public addFieldToForm(field: T) {
		this.fields.push(field);

		// We don't want to have control exist even after it has unmounted (if it exists conditionally)
		return () => {
			const index = this.fields.indexOf(field);
			// For some odd reason form control disappeared and we don't want it to randomly cut off last element (-1 cuts off last element)
			// Future-proof
			if (index < 0) return;

			return this.fields.splice(index, 1);
		};
	}
}
export class FormInstance extends AbstractFormInstance<IFormField<unknown>> {
	public static contextKey = {};

	public fields: IFormField<unknown>[] = $state([]);
	public values: Record<FormFieldKey, unknown> = $derived(
		FormInstance.mapInstance(this.fields, (x) => [x.key, x.value]),
	);

	public valid: boolean = $derived(this.fields.every((x) => x.valid));
	public changed: boolean = $derived(this.fields.some((x) => x.changed));

	constructor(
		private _submit: () =>
			| undefined
			| ((
					values: Record<FormFieldKey, unknown>,
					ev?: MouseEvent | undefined,
			  ) => Promise<unknown> | unknown),
	) {
		super();
	}

	public submit(ev?: MouseEvent) {
		return this._submit()?.(this.values, ev);
	}

	protected static mapInstance<TAfter, TBefore>(
		controls: IFormField<TBefore>[],
		fn: (instance: IFormField<TBefore>) => [FormFieldKey, TAfter],
	) {
		return Object.fromEntries(controls.map(fn));
	}
}

export function getForm<T extends IFormInstance<unknown, IFormField<unknown>>>() {
	return getContext<T>(FormInstance.contextKey);
}
export function setForm(instance: IFormInstance<unknown, IFormField<unknown>>) {
	return setContext(FormInstance.contextKey, instance);
}
