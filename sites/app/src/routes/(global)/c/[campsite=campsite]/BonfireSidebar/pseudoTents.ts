import type { TentViewBasic } from '$lib/types/campground/tent.js';

export type PseudoTentType = 'bulletin';

export interface PseudoTentViewBasic extends Omit<
	TentViewBasic,
	'campsiteId' | 'bonfireId' | 'categoryId' | 'name' | 'type' | 'position'
> {
	type: PseudoTentType;
}
export const psuedoTentList: PseudoTentViewBasic[] = [
	{ id: 'bulletin', type: 'bulletin', viewType: 0, description: '' },
];
