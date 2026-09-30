import { filter } from 'rxjs';
import type { CampsiteContext } from '../context.svelte.ts';
import { tentMessageHandlers } from './tents.ts';
import type { WebSocketMessageHandlers } from './types.ts';
import { roleMessageHandlers } from './roles.ts';

const wsMessageHandlers: Partial<WebSocketMessageHandlers> = {
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

		context.campsite!.bonfires = context.bonfires!.filter((x) => x.id !== bonfire.id);
	},
	...tentMessageHandlers,
	...roleMessageHandlers,
};

export function handleWebSocket(context: CampsiteContext) {
	const subscription = context.webSocket?.messages
		.pipe(filter((value) => value.op === 1))
		.subscribe((value) => wsMessageHandlers[value.t]?.(value.payload as never, context));

	return () => subscription?.unsubscribe();
}
