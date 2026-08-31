import type { HTMLAttributes } from 'svelte/elements';
import type { InFlexLayout, InGridLayout } from '../layout.ts';
import type { Size } from '$lib/util/component.js';

export type GridSizing = 'auto' | 'stretch';
export interface RootProps
	extends HTMLAttributes<HTMLElementTagNameMap['div']>, InFlexLayout, InGridLayout {
	gap?: Size;
	columns?: 2 | 3 | 4 | 5;
	columnSizing?: GridSizing;
	noBreakpoint?: boolean;
}
export interface CellProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	start?: 1 | 2 | 3 | 4 | 5;
	end?: 1 | 2 | 3 | 4 | 5;
}
