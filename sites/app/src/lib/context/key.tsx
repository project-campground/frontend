import { createContext, useContext } from 'react';

export interface KeyContext {
	shift: boolean;
	control: boolean;
}
export const KeyContext = createContext<KeyContext>({ shift: false, control: false });
export const useKeyContext = () => useContext(KeyContext);
