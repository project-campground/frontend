import { createContext } from 'svelte';

export class KeyContext {
	public keys = $state.raw({ shift: false, control: false });
}
export const [getKeys, setKeys] = createContext<KeyContext>();
