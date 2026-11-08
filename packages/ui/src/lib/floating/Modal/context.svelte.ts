import { createContext } from 'svelte';
import type { MenuPortalInstance } from '../MenuPortalContainer/portals.svelte.ts';

export class ModalContext {
	constructor(private _getInstance: () => MenuPortalInstance) {}

	public get instance() {
		return this._getInstance();
	}
	public closeModal() {
		return this.instance.destroy();
	}
}

export const [getModal, setModal] = createContext<ModalContext>();
