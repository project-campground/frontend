import type { HTMLAttributes } from 'svelte/elements';
import type { InFlexLayout, InGridLayout } from '../layout.ts';
import type { Size } from '$lib/util/component.js';

export type GridSizing = 'auto' | 'stretch';
export interface RootProps
	extends HTMLAttributes<HTMLElementTagNameMap['div']>, InFlexLayout, InGridLayout {
	gap?: Size;
	columns?: number;
	breakpointReduce?: number;
	columnSizing?: GridSizing;
}
export interface CellProps extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	start?: number;
	end?: number;
}
