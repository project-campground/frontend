import { createContext } from 'svelte';

export class PickContext {
	public activeItemIndex = $state(0);
	public itemsForm: HTMLFormElement | null = $state(null);

	public items = $derived(this.itemsForm?.items as RadioNodeList);
	public activeTab = $derived(this.items?.item(this.activeItemIndex));
	public itemCount = $derived(this.items?.length);

	public setActiveItem(input: HTMLInputElement) {
		// console.log('Setting active item', input, this.items);
		console.log('Active item');
		console.log('Setting active item', this.itemsForm);
		this.activeItemIndex = [...(this.items ?? [])].indexOf(input);
	}
}

export const [getPickContext, setPickContext] = createContext<PickContext>();
