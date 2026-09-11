import { filter } from 'rxjs';
import type { CampsiteContext } from './context.svelte.ts';
import type { WSMessageTypeToPayload } from '$lib/api/ws/types.js';
import type { TentCategoryView, TentViewBasic } from '$lib/types/campground/tent.js';

function createBonfireItemEventHandler<T extends { id: string; bonfireId: string }>(
	name: 'Tent' | 'Category',
	propName: 'tents' | 'categories',
) {
	return {
		[`${name}Created`](payload: T, context: CampsiteContext) {
			// To not wrongfully populate bonfire
			if (payload.bonfireId !== context.openBonfire?.bonfireId) return;

			context.openBonfire?.tentOutput[propName].push(
				payload as unknown as TentCategoryView & TentViewBasic,
			);
		},
		[`${name}Updated`](payload: T, context: CampsiteContext) {
			const updatedTent = context.openBonfire?.tentOutput[propName].find((x) => x.id === payload.id);

			if (!updatedTent) return;

			Object.assign(updatedTent, payload);
		},
		[`${name}Deleted`](payload: T, context: CampsiteContext) {
			if (!context.openBonfire) return;

			context.openBonfire.tentOutput[propName] = (context.openBonfire?.tentOutput[propName].filter(
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
	...createBonfireItemEventHandler('Tent', 'tents'),
	...createBonfireItemEventHandler('Category', 'categories'),
};

export function handleWebSocket(context: CampsiteContext) {
	const subscription = context.webSocket?.messages
		.pipe(filter((value) => value.op === 1))
		.subscribe((value) => wsMessageHandlers[value.t]?.(value.payload as never, context));

	return () => subscription?.unsubscribe();
}
