import { createContext } from 'svelte';

export class PickContext {
	public activeItemIndex = $state(0);
	public itemsForm: HTMLFormElement | null = $state(null);

	public items = $derived(this.itemsForm?.items as RadioNodeList);
	public activeItem = $derived(this.items?.item(this.activeItemIndex));
	public itemCount = $derived(this.items?.length);

	public setActiveItem(input: HTMLInputElement) {
		this.setActiveIndex([...(this.items ?? [])].indexOf(input));
	}
	public setActiveIndex(index: number) {
		this.activeItemIndex = index;
	}
}

export const [getPickContext, setPickContext] = createContext<PickContext>();
