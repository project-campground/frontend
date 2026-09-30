import type { WebSocketMessageHandlers } from './types.ts';

export const roleMessageHandlers: Partial<WebSocketMessageHandlers> = {
	RoleCreated(payload, context) {
		if (!context.campsite) return;

		const newRolePos = payload.position;

		const insertedStartingIndex = context.roles!.findLastIndex((x) => x.position >= newRolePos);

		context.campsite!.roles = [
			...(context.roles!.slice(0, insertedStartingIndex) ?? []),
			payload,
			...(context.roles!.slice(insertedStartingIndex) ?? []),
		];
	},
	RoleUpdated(payload, context) {
		if (!context.campsite) return;

		const role = context.roles!.find((x) => x.id === payload.id);

		if (!role) return;

		Object.assign(role, payload);
	},
	RoleDeleted(payload, context) {
		if (!context.campsite) return;

		context.campsite.roles = context.roles!.filter((x) => x.id !== payload.id);
	},
};
