import type { WSMessageTypeToPayload } from '$lib/api/ws/types.js';
import type { AccountInfo } from '$lib/context/account.svelte.ts';
import type { CampsiteContext } from '../context.svelte.ts';

export type WebSocketMessageHandler<K extends keyof WSMessageTypeToPayload> = (
	payload: WSMessageTypeToPayload[K],
	context: CampsiteContext,
	account: AccountInfo,
) => unknown;
export type WebSocketMessageHandlers = {
	[K in keyof WSMessageTypeToPayload]: WebSocketMessageHandler<K>;
};
