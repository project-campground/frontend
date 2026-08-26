import { v4 as uuid } from 'uuid';

export abstract class PortalInstance<TPortal extends Portal<PortalInstance<TPortal>, any>> {
	// Key is necessary, because {#each } doesn't have key and can't tell if you just cleared and put another instance or
	// it's the same instance and has been updated (with no apparent changes to the container)
	// It also gives better accessibility for screen readers for tooltips
	constructor(
		public key: string,
		public portal: TPortal,
		public invoker: HTMLElement,
	) {}
	public destroy() {
		return this.portal.remove(this);
	}
	public get exists() {
		return this.portal.includes(this);
	}
}

export abstract class Portal<
	TInstance extends PortalInstance<Portal<TInstance, TConfig>>,
	TConfig,
> {
	private _outsideClickHandlers: null | ((ev: MouseEvent) => unknown) = null;
	public items = $state<TInstance[]>([]);

	public abstract add(item: TConfig, invoker: HTMLElement, key?: string): TInstance;
	public remove(item: TInstance) {
		return (this.items = this.items.filter((x) => x !== item));
	}
	public clear() {
		return (this.items = []);
	}
	public includes(item: TInstance) {
		return this.items.includes(item);
	}
	public handleOutsideClick(handler: typeof this._outsideClickHandlers) {
		this._outsideClickHandlers = handler;
	}
	public onOutsideClick(ev: MouseEvent) {
		this._outsideClickHandlers?.(ev);
	}
}
