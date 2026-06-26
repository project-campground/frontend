import { createContext } from 'svelte';
import type { Writable } from 'svelte/store';

// Perhaps reactive programming would be a better handle of this?
export type OutsideClick = Writable<
	(MouseEvent & { currentTarget: EventTarget & HTMLElement }) | null
>;

export const [getOutsideClickBoundary, setOutsideClickBoundary] = createContext<OutsideClick>();
