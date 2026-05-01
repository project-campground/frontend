import { createContext } from 'svelte';

export type TabId = string | number | boolean;
export interface TabContext {
	onTabSelect: (id: TabId) => void;
}

export const [getTabContext, setTabContext] = createContext<TabContext>();
