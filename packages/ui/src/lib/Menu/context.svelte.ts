import type { SelectValue } from '$lib/Select/props.js';
import { createContext } from 'svelte';
import type { Readable } from 'svelte/store';

export type MenuListOnAction = (id: SelectValue | null | undefined) => unknown;
export interface MenuListContext {
	onaction?: Readable<MenuListOnAction | undefined>;
}

export const [getMenuList, setMenuList] = createContext<MenuListContext>();
