import type { WSMessageTypeToPayload } from '#lib/api/ws/types.js';
import type { Session } from '#lib/context/session/context.svelte.js';
import type { CampsiteContext } from '../context.svelte.ts';

export type WebSocketMessageHandler<K extends keyof WSMessageTypeToPayload> = (
	payload: WSMessageTypeToPayload[K],
	context: CampsiteContext,
	account: Session,
) => unknown;
export type WebSocketMessageHandlers = {
	[K in keyof WSMessageTypeToPayload]: WebSocketMessageHandler<K>;
};
