import { createContext } from 'svelte';

export class TabsContext {
	public activeTabIndex = $state(0);
	public tabItemsForm: HTMLFormElement | null = $state(null);

	public activeTab = $derived(
		(this.tabItemsForm?.items as RadioNodeList)?.item(this.activeTabIndex),
	);
	public tabCount = $derived((this.tabItemsForm?.items as RadioNodeList)?.length);

	public setActiveTab(input: HTMLInputElement) {
		this.activeTabIndex = [...((this.tabItemsForm?.items as RadioNodeList) ?? [])].indexOf(input);
	}
}

export const [getTabsContext, setTabsContext] = createContext<TabsContext>();
