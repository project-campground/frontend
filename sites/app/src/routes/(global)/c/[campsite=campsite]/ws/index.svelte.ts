import { filter } from 'rxjs';
import type { CampsiteContext } from '../context.svelte.ts';
import { tentMessageHandlers } from './tents.ts';
import type { WebSocketMessageHandlers } from './types.ts';
import { roleMessageHandlers } from './roles.svelte.ts';
import { goto } from '$app/navigation';
import { NavigationItemType } from '#lib/context/session/types.js';
import type { Session } from '#lib/context/session/context.svelte.js';

const wsMessageHandlers: Partial<WebSocketMessageHandlers> = {
	CampsiteUpdated(payload, context, account) {
		const modifiedNavbarCampsites = account.navbarItems.filter(
			(x) =>
				x.type === NavigationItemType.Campsite
				&& x.campsite.id === payload.id
				&& x.campsite.domain === context.domain,
		);

		for (const modifiedCampsite of modifiedNavbarCampsites)
			Object.assign(modifiedCampsite.campsite, payload);

		// No way to know domain? But also, WS does not update about other bonfires
		if (payload.id !== context.campsite?.id) return;

		context.campsiteReference!.campsite = { ...context.campsiteReference!.campsite, ...payload };
	},
	CampsiteLeft({ id }, context, account) {
		if (!context.domain) return;
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		else if (id === context.campsite!.id) goto('/');

		return account.removeCampsiteFromNavbar(context.domain, id);
	},
	BonfireCreated(bonfire, context) {
		context.bonfires?.push(bonfire);
	},
	BonfireUpdated(bonfire, context) {
		const oldBonfire = context.bonfires?.find((x) => x.id === bonfire.id);

		if (!oldBonfire) return;

		Object.assign(oldBonfire, bonfire);
	},
	BonfireDeleted(bonfire, context) {
		context.campsiteReference!.bonfires = context.campsiteReference!.bonfires.filter(
			(x) => x.id !== bonfire.id,
		);

		if (bonfire.id !== context.openBonfire?.id) return;

		context.openBonfire = null;
		context.setActiveBonfire(context.bonfires!.find((x) => x.id !== bonfire.id)!.id);
	},
	...tentMessageHandlers,
	...roleMessageHandlers,
};

export function handleWebSocket(context: CampsiteContext, session: Session) {
	const subscription = context.webSocket?.messages
		.pipe(filter((value) => value.op === 1))
		.subscribe((value) => wsMessageHandlers[value.t]?.(value.payload as never, context, session));

	return () => subscription?.unsubscribe();
}
