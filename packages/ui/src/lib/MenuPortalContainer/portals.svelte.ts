import { Portal, PortalInstance } from '$lib/portals.svelte.js';
import { createContext, type Snippet } from 'svelte';

type InstanceSnippet = Snippet<[MenuPortalInstance]>;

export class MenuPortalInstance extends PortalInstance<MenuPortal> {
	public snippet: InstanceSnippet;
	constructor(portal: MenuPortal, snippet: InstanceSnippet) {
		super(portal);
		this.snippet = snippet;
	}
}
export class MenuPortal extends Portal<MenuPortalInstance, InstanceSnippet> {
	public add(item: InstanceSnippet): MenuPortalInstance {
		const instance = new MenuPortalInstance(this, item);
		this.items.push(instance);
		return instance;
	}
}
export const [getMenuPortal, setMenuPortal] = createContext<MenuPortal>();
