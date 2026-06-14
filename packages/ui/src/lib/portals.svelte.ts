export abstract class PortalInstance<TPortal extends Portal<PortalInstance<TPortal>, any>> {
	public portal: TPortal;

	constructor(portal: TPortal) {
		this.portal = portal;
	}
	public destroy() {
		return this.portal.remove(this);
	}
}

export abstract class Portal<
	TInstance extends PortalInstance<Portal<TInstance, TConfig>>,
	TConfig
> {
	private _outsideClickHandlers: null | ((ev: MouseEvent) => unknown) = null;
	public items = $state<TInstance[]>([]);

	public abstract add(item: TConfig): TInstance;
	public remove(item: TInstance) {
		return (this.items = this.items.filter((x) => x !== item));
	}
	public clear() {
		return (this.items = []);
	}
	public handleOutsideClick(handler: typeof this._outsideClickHandlers) {
		this._outsideClickHandlers = handler;
	}
	public onOutsideClick(ev: MouseEvent) {
		this._outsideClickHandlers?.(ev);
	}
}
