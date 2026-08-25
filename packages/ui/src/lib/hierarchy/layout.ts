import type { GridArea } from '$lib/types/attributes.js';

export interface InGridLayout {
	gridColumn?: GridArea;
	gridRow?: GridArea;
}
export interface InFlexLayout {
	flex?: number;
}
