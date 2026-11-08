import type { CampsiteContext } from '../context.svelte.ts';

export function findItemInOutput<T extends { id: string; bonfireId: string }>(
	context: CampsiteContext,
	propName: 'tents' | 'categories',
	id: string,
): [number, T | null] {
	const updatedItemIndex = context.openBonfire?.[propName].findIndex((x) => x.id === id) ?? -1;
	const updatedItem =
		updatedItemIndex < 0 ? null : context.openBonfire![propName][updatedItemIndex]!;

	return [updatedItemIndex, updatedItem as unknown as T | null];
}

/**
 * Replicates appview's make-room-for tents and categories mechanism for more accurate display.
 * @param payload
 * @param others
 */
export function makeRoomForItems<T extends { id: string; position: number }>(
	payload: T,
	others: Array<T>,
) {
	// There is possibility that there was already gap for that
	if (others?.some((x) => x.id !== payload.id && x.position === payload.position))
		// Less updates to state compared to for loop
		return others.map((other) => ({
			...other,
			position:
				other.id === payload.id ? payload.position
				: other.position >= payload.position ? other.position + 1
				: other.position,
		}));

	return others;
}
