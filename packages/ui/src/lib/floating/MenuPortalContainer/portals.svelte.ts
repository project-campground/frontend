import { v4 as uuid } from 'uuid';
import { Portal, PortalInstance } from '$lib/floating/portals.svelte.js';
import { createContext, type Snippet } from 'svelte';

type InstanceSnippet = Snippet<[MenuPortalInstance]>;

export class MenuPortalInstance extends PortalInstance<MenuPortal> {
	constructor(
		key: string,
		portal: MenuPortal,
		invoker: HTMLElement,
		public snippet: InstanceSnippet,
	) {
		super(key, portal, invoker);
	}
}
export class MenuPortal extends Portal<MenuPortalInstance, InstanceSnippet> {
	public add(item: InstanceSnippet, invoker: HTMLElement, key: string = uuid()): MenuPortalInstance {
		const instance = new MenuPortalInstance(key, this, invoker, item);
		this.items.push(instance);
		return instance;
	}
}
export const [getMenuPortal, setMenuPortal] = createContext<MenuPortal>();
