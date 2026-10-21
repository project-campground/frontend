import type { WebSocketMessageHandlers } from './types.ts';
import { makeRoomForItems } from './util.svelte.ts';

export const roleMessageHandlers: Partial<WebSocketMessageHandlers> = {
	RoleCreated(payload, context) {
		if (!context.campsite) return;

		const newRolePos = payload.position;

		const insertedStartingIndex = context.roles!.findLastIndex((x) => x.position >= newRolePos);

		context.campsiteReference!.campsite.roles = [
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
	RoleMoved(payload, context) {
		if (!context.campsite) return;

		const roleIndex = context.campsite.roles.findIndex((x) => x.id === payload.id);
		const role = context.campsite.roles[roleIndex];

		Object.assign(role, payload);

		context.campsite.roles = makeRoomForItems(payload, context.campsite.roles);
		context.campsite.roles.sort((a, b) => a.position - b.position);
	},
};
