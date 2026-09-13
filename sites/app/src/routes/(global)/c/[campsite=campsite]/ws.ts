import { filter } from 'rxjs';
import type { CampsiteContext } from './context.svelte.ts';
import type { WSMessageTypeToPayload } from '$lib/api/ws/types.js';
import type { TentCategoryView, TentViewBasic } from '$lib/types/campground/tent.js';

function createBonfireItemEventHandler<
	T extends { id: string; bonfireId: string; position: number },
>(name: 'Tent' | 'Category', propName: 'tents' | 'categories') {
	return {
		[`${name}Created`](payload: T, context: CampsiteContext) {
			// To not wrongfully populate bonfire
			if (payload.bonfireId !== context.openBonfire?.bonfireId) return;

			context.openBonfire?.[propName].push(payload as unknown as TentCategoryView & TentViewBasic);
		},
		[`${name}Updated`](payload: T, context: CampsiteContext) {
			const updatedTent = context.openBonfire?.[propName].find((x) => x.id === payload.id);

			if (!updatedTent) return;

			Object.assign(updatedTent, payload);
		},
		[`${name}Deleted`](payload: T, context: CampsiteContext) {
			if (!context.openBonfire) return;

			context.openBonfire[propName] = (context.openBonfire?.[propName].filter(
				(x) => x.id === payload.id,
			) ?? []) as TentViewBasic[] & TentCategoryView[];
		},
	};
}

const wsMessageHandlers: Partial<{
	[K in keyof WSMessageTypeToPayload]: (
		payload: WSMessageTypeToPayload[K],
		context: CampsiteContext,
	) => unknown;
}> = {
	BonfireCreated(bonfire, context) {
		context.bonfires?.push(bonfire);
	},
	BonfireUpdated(bonfire, context) {
		const oldBonfire = context.bonfires?.find((x) => x.id === bonfire.id);

		if (!oldBonfire) return;

		Object.assign(oldBonfire, bonfire);
	},
	BonfireDeleted(bonfire, context) {
		if (bonfire.id === context.openBonfire?.bonfireId)
			context.setActiveBonfire(context.bonfires!.find((x) => x.id !== bonfire.id)!.id);

		context.campsiteReference!.campsite.bonfires = context.bonfires!.filter(
			(x) => x.id !== bonfire.id,
		);
	},
	CategoryMoved(payload, context) {
		const [categoryIndex, existingCategory] = findItemInOutput(context, 'categories', payload.id);

		// Got moved into the tent
		// FIXME Add tents that exist within category
		if (!existingCategory && payload.bonfireId === context.openBonfire?.bonfireId)
			return context.openBonfire?.categories.push(payload);
		// In different bonfire
		else if (!existingCategory) return;
		// Moved out of bonfire
		else if (payload.bonfireId !== context.openBonfire?.bonfireId) {
			// Tents won't be displayed most likely, but there is no reason to keep them in memory either
			context.openBonfire!.tents = context.openBonfire!.tents.filter(
				(x) => x.categoryId === payload.id,
			);

			return context.openBonfire!.categories.splice(categoryIndex, 1);
		}

		// Move around categories
		Object.assign(existingCategory, payload);

		return (context.openBonfire.categories = makeRoomForItems(
			payload,
			context.openBonfire!.categories,
		));
	},
	TentMoved(payload, context) {
		const [tentIndex, existingTent] = findItemInOutput<TentViewBasic>(context, 'tents', payload.id);

		// Got moved into the tent
		if (!existingTent && payload.bonfireId === context.openBonfire?.bonfireId)
			return context.openBonfire?.tents.push(payload);
		// In different bonfire
		else if (!existingTent) return;
		// Moved out of bonfire
		else if (payload.bonfireId !== context.openBonfire?.bonfireId)
			return context.openBonfire!.tents.splice(tentIndex, 1);
		// Changed categories, so we possibly need to recalculate permissions
		else if (
			payload.categoryId !== existingTent.categoryId
			&& context.openBonfire.tentToPermissions[payload.id]
		)
			context.openBonfire.recacheTentPermissions(payload.id, payload.categoryId);

		Object.assign(existingTent, { categoryId: null }, payload);

		return (context.openBonfire.tents = makeRoomForItems(payload, context.openBonfire!.tents));
	},
	...createBonfireItemEventHandler('Tent', 'tents'),
	...createBonfireItemEventHandler('Category', 'categories'),
};

function findItemInOutput<T extends { id: string; bonfireId: string }>(
	context: CampsiteContext,
	propName: 'tents' | 'categories',
	id: string,
): [number, T | null] {
	const updatedItemIndex = context.openBonfire?.[propName].findIndex((x) => x.id === id) ?? -1;
	const updatedItem =
		updatedItemIndex < 0 ? null : context.openBonfire![propName][updatedItemIndex]!;

	return [updatedItemIndex, updatedItem as unknown as T | null];
}

export function handleWebSocket(context: CampsiteContext) {
	const subscription = context.webSocket?.messages
		.pipe(filter((value) => value.op === 1))
		.subscribe((value) => wsMessageHandlers[value.t]?.(value.payload as never, context));

	return () => subscription?.unsubscribe();
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
