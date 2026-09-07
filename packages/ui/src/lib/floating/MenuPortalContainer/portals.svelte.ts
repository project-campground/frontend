import { v4 as uuid } from 'uuid';
import { Portal, PortalInstance } from '$lib/floating/portals.svelte.js';
import { createContext, type Snippet } from 'svelte';

type InstanceSnippet<T extends Event = Event> = Snippet<[MenuPortalInstance<T>]>;

export class MenuPortalInstance<T extends Event = Event> extends PortalInstance<MenuPortal> {
	constructor(
		key: string,
		portal: MenuPortal,
		public invoker: HTMLElement,
		public snippet: InstanceSnippet<T>,
		public event?: T,
	) {
		super(key, portal);
	}
}
export class MenuPortal extends Portal<MenuPortalInstance> {
	public add(
		item: InstanceSnippet,
		invoker: HTMLElement,
		key: string = uuid(),
		event?: Event,
	): MenuPortalInstance {
		const instance = new MenuPortalInstance(key, this, invoker, item, event);
		this.items.push(instance);
		return instance;
	}
}
export const [getMenuPortal, setMenuPortal] = createContext<MenuPortal>();
