import { Portal, PortalInstance } from '$lib/floating/portals.svelte.ts';
import { createContext, type Snippet } from 'svelte';

type InstanceSnippet = Snippet<[MenuPortalInstance]>;

export class MenuPortalInstance extends PortalInstance<MenuPortal> {
	public snippet: InstanceSnippet;
	constructor(portal: MenuPortal, snippet: InstanceSnippet, invoker: HTMLElement) {
		super(portal, invoker);
		this.snippet = snippet;
	}
}
export class MenuPortal extends Portal<MenuPortalInstance, InstanceSnippet> {
	public add(item: InstanceSnippet, invoker: HTMLElement): MenuPortalInstance {
		const instance = new MenuPortalInstance(this, item, invoker);
		this.items.push(instance);
		return instance;
	}
}
export const [getMenuPortal, setMenuPortal] = createContext<MenuPortal>();
