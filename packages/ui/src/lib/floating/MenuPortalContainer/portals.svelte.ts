import { v4 as uuid } from 'uuid';
import { Portal, PortalInstance } from '$lib/floating/portals.svelte.js';
import { createContext, type Snippet } from 'svelte';

type InstanceSnippet<T = unknown> = Snippet<[MenuPortalInstance<T>]>;

export class MenuPortalInstance<T = unknown> extends PortalInstance<MenuPortal> {
	constructor(
		key: string,
		portal: MenuPortal,
		public invoker: HTMLElement,
		public snippet: InstanceSnippet<T>,
		public payload?: T,
	) {
		super(key, portal);
	}
}
export class MenuPortal extends Portal<MenuPortalInstance<unknown>> {
	public add<T>(
		item: InstanceSnippet<T>,
		invoker: HTMLElement,
		key: string = uuid(),
		payload?: T,
	): MenuPortalInstance<T> {
		const instance = new MenuPortalInstance(key, this, invoker, item, payload);
		this.items.push(instance as MenuPortalInstance<unknown>);
		return instance;
	}
}

export const [getMenuPortal, setMenuPortal] = createContext<MenuPortal>();
