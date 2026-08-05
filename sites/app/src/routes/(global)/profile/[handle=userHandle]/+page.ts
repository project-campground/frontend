import HTTPAtprotoClient from '$lib/api/http/HTTPAtprotoClient.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types.d.ts';

export const load: PageLoad = async ({ parent, params: { handle } }) => {
	const parentData = await parent();
	const sessionUser = parentData.session.user;

	const atprotoClient = new HTTPAtprotoClient({
		auth: sessionUser.accessJwt,
		refreshAuth: sessionUser.refreshJwt,
		url: parentData.session.server,
		userDid: parentData.session.user.did,
	});

	const resolvedDid = await atprotoClient.identity.resolveHandle(handle.slice(1));

	if (!resolvedDid) error(404, { message: `User with that handle does not exist` });

	redirect(304, `/profile/${resolvedDid}`);
};
