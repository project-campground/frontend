import { filter } from 'rxjs';
import type { CampsiteContext } from '../context.svelte.ts';
import { tentMessageHandlers } from './tents.ts';
import type { WebSocketMessageHandlers } from './types.ts';
import { roleMessageHandlers } from './roles.ts';
import { AccountNavbarItemType, type AccountInfo } from '$lib/context/account.svelte.js';

const wsMessageHandlers: Partial<WebSocketMessageHandlers> = {
	CampsiteUpdated(payload, context, account) {
		const modifiedNavbarCampsites = account.navbarItems.filter(
			(x) =>
				x.type === AccountNavbarItemType.Campsite
				&& x.campsite.id === payload.id
				&& x.campsite._domain === context.domain,
		);

		for (const modifiedCampsite of modifiedNavbarCampsites)
			Object.assign(modifiedCampsite.campsite, payload);

		// No way to know domain? But also, WS does not update about other bonfires
		if (payload.id !== context.campsite?.id) return;

		context.campsiteReference!.campsite = { ...context.campsiteReference!.campsite, ...payload };
	},
	CampsiteLeft({ id }, context, account) {
		if (!context.domain) return;
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
		if (bonfire.id === context.openBonfire?.bonfireId)
			context.setActiveBonfire(context.bonfires!.find((x) => x.id !== bonfire.id)!.id);

		context.campsite!.bonfires = context.bonfires!.filter((x) => x.id !== bonfire.id);
	},
	...tentMessageHandlers,
	...roleMessageHandlers,
};

export function handleWebSocket(context: CampsiteContext, account: AccountInfo) {
	const subscription = context.webSocket?.messages
		.pipe(filter((value) => value.op === 1))
		.subscribe((value) => wsMessageHandlers[value.t]?.(value.payload as never, context, account));

	return () => subscription?.unsubscribe();
}
