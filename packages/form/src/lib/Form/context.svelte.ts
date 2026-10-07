import { getContext, setContext } from 'svelte';
import type { IFormControl } from '$lib/FormControl/context.svelte.js';
import type { FormFieldId } from './props.ts';

export interface IFormInstance<TValue, TControl extends IFormControl<TValue>> {
	changed: boolean;
	valid: boolean;
	controls: TControl[];

	addControlToForm(instance: TControl): () => void;
	submit(ev?: MouseEvent): void;
	reset(): void;
}
export abstract class AbstractFormInstance implements IFormInstance<
	unknown,
	IFormControl<unknown>
> {
	public controls: IFormControl<unknown>[] = $state([]);

	public valid: boolean = $derived(this.controls.every((x) => x.valid));
	public changed: boolean = $derived(this.controls.some((x) => x.changed));

	public abstract submit(): void;

	public reset() {
		return this.controls.map((x) => x.reset());
	}

	public addControlToForm(formControl: IFormControl<unknown>) {
		this.controls.push(formControl);

		// We don't want to have control exist even after it has unmounted (if it exists conditionally)
		return () => {
			const index = this.controls.indexOf(formControl);
			// For some odd reason form control disappeared and we don't want it to randomly cut off last element (-1 cuts off last element)
			// Future-proof
			if (index < 0) return;

			return this.controls.splice(index, 1);
		};
	}
}
export class FormInstance
	extends AbstractFormInstance
	implements IFormInstance<unknown, IFormControl<unknown>>
{
	public static contextKey = {};

	public controls: IFormControl<unknown>[] = $state([]);
	public values: Record<FormFieldId, unknown> = $derived(
		FormInstance.mapInstance(this.controls, (x) => [x.id, x.value]),
	);

	public valid: boolean = $derived(this.controls.every((x) => x.valid));
	public changed: boolean = $derived(this.controls.some((x) => x.changed));

	constructor(
		private _submit: () =>
			| undefined
			| ((
					values: Record<FormFieldId, unknown>,
					ev?: MouseEvent | undefined,
			  ) => Promise<unknown> | unknown),
	) {
		super();
	}

	public submit(ev?: MouseEvent) {
		return this._submit()?.(this.values, ev);
	}

	protected static mapInstance<TAfter, TBefore>(
		controls: IFormControl<TBefore>[],
		fn: (instance: IFormControl<TBefore>) => [FormFieldId, TAfter],
	) {
		return Object.fromEntries(controls.map(fn));
	}
}

export function getForm<T extends IFormInstance<unknown, IFormControl<unknown>>>() {
	return getContext<T>(FormInstance.contextKey);
}
export function setForm(instance: IFormInstance<unknown, IFormControl<unknown>>) {
	return setContext(FormInstance.contextKey, instance);
}
