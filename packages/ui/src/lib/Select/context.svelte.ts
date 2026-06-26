import { createContext } from 'svelte';
import type { SelectValue } from './props.ts';

export class SelectInstance {
	public isOpen = $state(false);

	constructor(
		public setValue: (
			newValue: SelectValue | null,
			mouseEvent: MouseEvent & { currentTarget: HTMLElement },
		) => unknown,
	) {}
}

export const [getSelect, setSelect] = createContext<SelectInstance>();
