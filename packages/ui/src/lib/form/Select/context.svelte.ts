import { createContext } from 'svelte';
import type { SelectValue } from './props.ts';

export type OnSelect<T> = (
	newValue: T,
	mouseEvent: MouseEvent & { currentTarget: HTMLElement },
) => unknown;

export const [getOnSelect, setOnSelect] = createContext<OnSelect<SelectValue>>();
