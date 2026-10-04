import { createContext } from 'svelte';
import type { Readable } from 'svelte/store';

export class FormArrayContext {
	public itemIds: number[] = $state([]);

	constructor(
		public getValue: () => unknown[],
		public setValue: (value: unknown[]) => unknown,
		public max: Readable<number | undefined | null>,
	) {}

	public addItem() {
		this.itemIds.push(Date.now());
	}
	public removeItem(id: number) {
		const index = this.itemIds.indexOf(id);

		if (index < 0) return;

		this.itemIds.splice(index, 1);
		const currentValue = this.getValue();

		return currentValue.splice(index, 1);
	}
}

export const [getFormArray, setFormArray] = createContext<FormArrayContext>();
