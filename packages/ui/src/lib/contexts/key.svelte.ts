import { createContext } from 'svelte';

export enum ActiveKey {
	None = 0,
	Shift = 1 << 0,
	Control = 1 << 1,
}

export class ActiveKeyContext {
	public keys: number = $state(ActiveKey.None);

	public static getKeyValueFrom(ev: KeyboardEvent): number {
		return Number(ev.shiftKey) * ActiveKey.Shift + Number(ev.ctrlKey) * ActiveKey.Control;
	}
}

export const [getActiveKeys, setActiveKeys] = createContext<ActiveKeyContext>();
