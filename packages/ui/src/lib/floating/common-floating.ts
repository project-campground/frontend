import type { AutoPlacementOptions, Placement } from '@floating-ui/dom';

export type MenuPlacementHorizontal = 'left' | 'center' | 'right';
export type MenuPlacementVertical = 'top' | 'middle' | 'bottom';
export type MenuPlacement = Exclude<
	`${MenuPlacementVertical}-${MenuPlacementHorizontal}`,
	'middle-center'
>;

export interface CommonFloatingProps {
	placement?: Placement;
	offset?: number;
	autoPlacement?: AutoPlacementOptions;
}
